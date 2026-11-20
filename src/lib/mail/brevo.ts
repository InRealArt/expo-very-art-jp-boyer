const ENDPOINT = 'https://api.brevo.com/v3/smtp/email'
const EMAIL = /^[^@\s<>]+@[^@\s<>]+\.[^@\s<>]+$/
const TIMEOUT_MS = 10_000

export function escapeHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export interface MailInput {
  to: string
  subject: string
  html: string
  replyTo?: string
}

export interface MailOptions {
  apiKey: string
  /** Always comes from server config, never from user input. */
  sender: { email: string; name: string }
  fetchImpl?: typeof fetch
}

const hasLineBreak = (s: string) => /[\r\n]/.test(s)

export async function sendMail(m: MailInput, o: MailOptions): Promise<void> {
  if (hasLineBreak(m.subject)) throw new Error('subject must be a single line')
  if (!EMAIL.test(m.to) || hasLineBreak(m.to)) throw new Error('invalid recipient')
  if (m.replyTo !== undefined && (!EMAIL.test(m.replyTo) || hasLineBreak(m.replyTo))) {
    throw new Error('invalid replyTo address')
  }

  const res = await (o.fetchImpl ?? fetch)(ENDPOINT, {
    method: 'POST',
    headers: { 'api-key': o.apiKey, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      sender: o.sender,
      to: [{ email: m.to }],
      subject: m.subject,
      htmlContent: m.html,
      ...(m.replyTo ? { replyTo: { email: m.replyTo } } : {}),
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })
  if (!res.ok) throw new Error(`brevo request failed with status ${res.status}`)
}

const CONTACTS_ENDPOINT = 'https://api.brevo.com/v3/contacts'
const ATTRIBUTE_NAME = /^[A-Z][A-Z0-9_]*$/

export interface ContactInput {
  email: string
  /** Brevo attribute name (upper case) to value. A boolean goes to a Brevo boolean attribute; empty text is left out. */
  attributes: Record<string, string | boolean>
  listId: number
}

export interface ContactOptions {
  apiKey: string
  fetchImpl?: typeof fetch
}

/** Brevo wants an international number for the SMS attribute. A French national number is converted, anything else invalid is dropped. */
export function normalizePhone(raw: string): string | undefined {
  const digits = raw.replace(/[\s.()-]/g, '')
  if (/^\+\d{8,15}$/.test(digits)) return digits
  if (/^00\d{8,15}$/.test(digits)) return `+${digits.slice(2)}`
  if (/^0\d{9}$/.test(digits)) return `+33${digits.slice(1)}`
  return undefined
}

/** Creates the contact in a Brevo list, or updates it when the address is already known. */
export async function upsertContact(c: ContactInput, o: ContactOptions): Promise<void> {
  if (!EMAIL.test(c.email) || hasLineBreak(c.email)) throw new Error('invalid contact address')
  if (!Number.isInteger(c.listId) || c.listId <= 0) throw new Error('invalid list id')

  const attributes: Record<string, string | boolean> = {}
  for (const [name, raw] of Object.entries(c.attributes)) {
    if (!ATTRIBUTE_NAME.test(name)) throw new Error(`invalid attribute name ${name}`)
    if (typeof raw === 'boolean') {
      attributes[name] = raw
      continue
    }
    const value = name === 'SMS' ? normalizePhone(raw) : raw.trim()
    if (value) attributes[name] = value
  }

  const res = await (o.fetchImpl ?? fetch)(CONTACTS_ENDPOINT, {
    method: 'POST',
    headers: { 'api-key': o.apiKey, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({ email: c.email, attributes, listIds: [c.listId], updateEnabled: true }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })
  if (!res.ok) {
    // Brevo explains refusals (unknown attribute, invalid list): keep that text for the operator's logs. It holds no visitor data.
    const detail = await res.json().then((b: { message?: string }) => b.message ?? '', () => '')
    throw new Error(`brevo contact request failed with status ${res.status} ${detail}`.trim())
  }
}
