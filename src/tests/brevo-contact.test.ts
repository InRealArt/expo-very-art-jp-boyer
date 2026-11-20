import { afterEach, describe, expect, it, vi } from 'vitest'
import { makeSender } from '../lib/forms/mail'
import { normalizePhone, upsertContact } from '../lib/mail/brevo'

type Call = { url: string; body: Record<string, unknown> }
const recorder = (statusFor: (url: string) => number = () => 201) => {
  const calls: Call[] = []
  const fetchImpl = (async (url: string, init: RequestInit) => {
    calls.push({ url, body: JSON.parse(String(init.body)) })
    const status = statusFor(url)
    return new Response(status >= 400 ? '{"message":"Invalid attribute"}' : '{}', { status })
  }) as unknown as typeof fetch
  return { calls, fetchImpl }
}

describe('normalizePhone', () => {
  it.each([
    ['06 13 80 45 91', '+33613804591'],
    ['06.13.80.45.91', '+33613804591'],
    ['+33 6 13 80 45 91', '+33613804591'],
    ['0033613804591', '+33613804591'],
    ['+44 20 7946 0958', '+442079460958'],
  ])('%s becomes %s', (raw, expected) => expect(normalizePhone(raw)).toBe(expected))

  it.each(['', 'abc', '0613', '613804591'])('drops %j', (raw) => expect(normalizePhone(raw)).toBeUndefined())
})

describe('upsertContact', () => {
  it('posts the contact to the list and updates an existing one', async () => {
    const { calls, fetchImpl } = recorder()
    await upsertContact(
      { email: 'ada@example.com', listId: 85, attributes: { PRENOM: ' Ada ', NOM: 'Lovelace', SMS: '06 13 80 45 91', VIDE: '' } },
      { apiKey: 'k', fetchImpl },
    )
    expect(calls[0].url).toBe('https://api.brevo.com/v3/contacts')
    expect(calls[0].body).toEqual({
      email: 'ada@example.com',
      attributes: { PRENOM: 'Ada', NOM: 'Lovelace', SMS: '+33613804591' },
      listIds: [85],
      updateEnabled: true,
    })
  })

  it('leaves out a phone number Brevo would refuse', async () => {
    const { calls, fetchImpl } = recorder()
    await upsertContact({ email: 'a@b.fr', listId: 1, attributes: { SMS: '0613' } }, { apiKey: 'k', fetchImpl })
    expect(calls[0].body.attributes).toEqual({})
  })

  it('refuses a bad address, list id or attribute name before any request', async () => {
    const { calls, fetchImpl } = recorder()
    const o = { apiKey: 'k', fetchImpl }
    await expect(upsertContact({ email: 'a@b.fr\nbcc:x@y.fr', listId: 1, attributes: {} }, o)).rejects.toThrow()
    await expect(upsertContact({ email: 'a@b.fr', listId: 0, attributes: {} }, o)).rejects.toThrow()
    await expect(upsertContact({ email: 'a@b.fr', listId: 1, attributes: { 'x"y': 'v' } }, o)).rejects.toThrow()
    expect(calls).toHaveLength(0)
  })

  it('reports the status and Brevo message on failure', async () => {
    const { fetchImpl } = recorder(() => 400)
    await expect(upsertContact({ email: 'a@b.fr', listId: 1, attributes: {} }, { apiKey: 'k', fetchImpl })).rejects.toThrow(
      /400 Invalid attribute/,
    )
  })
})

describe('makeSender with a contact', () => {
  const base = {
    to: 'team@example.com',
    subject: 'Nouvelle demande',
    apiKey: 'k',
    sender: { email: 'site@example.com', name: 'Site' },
  }
  const contact = { listId: 85, emailField: 'email', attributes: { prenom: 'PRENOM', nom: 'NOM', telephone: 'SMS' } }
  const data = { prenom: 'Ada', nom: 'Lovelace', email: 'ada@example.com', telephone: '0613804591' }

  afterEach(() => vi.restoreAllMocks())

  it('sends the notification, then creates the contact from the submitted fields', async () => {
    const { calls, fetchImpl } = recorder()
    await makeSender({ ...base, fetchImpl, contact })(data)
    expect(calls.map((c) => c.url)).toEqual(['https://api.brevo.com/v3/smtp/email', 'https://api.brevo.com/v3/contacts'])
    expect(calls[1].body).toMatchObject({
      email: 'ada@example.com',
      attributes: { PRENOM: 'Ada', NOM: 'Lovelace', SMS: '+33613804591' },
      listIds: [85],
    })
  })

  it('creates no contact without a list id', async () => {
    const { calls, fetchImpl } = recorder()
    await makeSender({ ...base, fetchImpl, contact: { ...contact, listId: undefined } })(data)
    expect(calls).toHaveLength(1)
  })

  it('does not fail the visitor when the contact request fails, and logs without the address', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { fetchImpl } = recorder((url) => (url.endsWith('/contacts') ? 400 : 201))
    await expect(makeSender({ ...base, fetchImpl, contact })(data)).resolves.toBeUndefined()
    expect(String(log.mock.calls[0])).toContain('400')
    expect(String(log.mock.calls[0])).not.toContain('ada@example.com')
  })

  it('creates no contact when the notification mail fails', async () => {
    const { calls, fetchImpl } = recorder(() => 500)
    await expect(makeSender({ ...base, fetchImpl, contact })(data)).rejects.toThrow()
    expect(calls).toHaveLength(1)
  })
})
