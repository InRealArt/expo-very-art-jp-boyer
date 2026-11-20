import { escapeHtml, sendMail, upsertContact, type MailInput, type MailOptions } from '../mail/brevo'

export interface ComposeOptions {
  to: string
  /** Fixed text: the subject is never built from submitted data. */
  subject: string
  /** Name of the submitted field holding the visitor's address, used as replyTo. */
  replyToField?: string
  /** Field name to human label, shown in the mail instead of the technical name. */
  labels?: Record<string, string>
  /** Names of consent boxes: a ticked one is shown as "Oui". */
  checkboxes?: string[]
}

/** Builds the notification mail. Every submitted value and label is HTML-escaped before it reaches the body. */
export function composeMail(data: Record<string, string>, o: ComposeOptions): MailInput {
  const rows = Object.entries(data)
    .filter(([, value]) => value.trim() !== '')
    .map(([key, value]) => {
      const shown = o.checkboxes?.includes(key) ? 'Oui' : value
      return `<dt>${escapeHtml(o.labels?.[key] ?? key)}</dt><dd>${escapeHtml(shown).replace(/\r\n|\r|\n/g, '<br>')}</dd>`
    })
  const replyTo = o.replyToField ? data[o.replyToField] : undefined
  return {
    to: o.to,
    subject: o.subject,
    html: `<dl>${rows.join('')}</dl>`,
    ...(replyTo ? { replyTo } : {}),
  }
}

export interface ContactSync {
  /** Brevo list receiving the contact. Without it nothing is synced. */
  listId?: number
  /** Name of the submitted field holding the visitor's address. */
  emailField: string
  /** Submitted field name to Brevo attribute name (for instance prenom to PRENOM). */
  attributes: Record<string, string>
  /** Fields of the attributes above that are consent boxes: they become true or false, for a Brevo boolean attribute. */
  checkboxes?: string[]
}

export type SenderOptions = Omit<ComposeOptions, 'to'> &
  Omit<MailOptions, 'sender'> & {
    /** Notification mail. Without a recipient or a sender no mail is sent. */
    to?: string
    sender?: MailOptions['sender']
    contact?: ContactSync
  }

/**
 * Ready-made `send` for handleForm. The notification mail (when configured) goes first, then the Brevo contact.
 * With a mail, a failed contact is only logged: the team already has the request.
 * Without one, the contact is the request itself, so a failure is a failed request.
 */
export function makeSender(o: SenderOptions): (data: Record<string, string>) => Promise<void> {
  const { apiKey, sender, fetchImpl, contact, to, ...compose } = o
  const mail = to && sender ? { to, sender } : null
  return async (data) => {
    if (mail) await sendMail(composeMail(data, { ...compose, to: mail.to }), { apiKey, sender: mail.sender, fetchImpl })
    if (!contact?.listId) {
      if (!mail) throw new Error('no mail and no Brevo list configured')
      return
    }
    try {
      const attributes: Record<string, string | boolean> = Object.fromEntries(
        Object.entries(contact.attributes).map(([field, attribute]) => [
          attribute,
          contact.checkboxes?.includes(field) ? data[field] === 'on' : (data[field] ?? ''),
        ]),
      )
      await upsertContact({ email: data[contact.emailField] ?? '', attributes, listId: contact.listId }, { apiKey, fetchImpl })
    } catch (error) {
      if (!mail) throw error
      console.error('brevo contact sync failed', error instanceof Error ? error.message : error)
    }
  }
}
