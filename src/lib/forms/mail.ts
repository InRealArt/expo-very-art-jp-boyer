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
}

/** Ready-made `send` for handleForm: compose, escape, then post through Brevo. */
export function makeSender(
  o: ComposeOptions & MailOptions & { contact?: ContactSync },
): (data: Record<string, string>) => Promise<void> {
  const { apiKey, sender, fetchImpl, contact, ...compose } = o
  return async (data) => {
    await sendMail(composeMail(data, compose), { apiKey, sender, fetchImpl })
    if (!contact?.listId) return
    // The team already has the notification: a Brevo contact failure is logged, not shown to the visitor.
    try {
      const attributes = Object.fromEntries(
        Object.entries(contact.attributes).map(([field, attribute]) => [attribute, data[field] ?? '']),
      )
      await upsertContact({ email: data[contact.emailField] ?? '', attributes, listId: contact.listId }, { apiKey, fetchImpl })
    } catch (error) {
      console.error('brevo contact sync failed', error instanceof Error ? error.message : error)
    }
  }
}
