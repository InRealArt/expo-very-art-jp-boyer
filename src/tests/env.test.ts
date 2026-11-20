import { describe, expect, it } from 'vitest'
import { parseServerEnv } from '../lib/env'

const ok = {
  TURNSTILE_SECRET_KEY: 'secret',
  BREVO_API_KEY: 'xkeysib-test',
  BREVO_SENDER_EMAIL: 'site@example.com',
  CONTACT_TO: 'contact@example.com',
}

describe('parseServerEnv', () => {
  it('accepts a complete environment', () => {
    expect(parseServerEnv(ok).CONTACT_TO).toBe('contact@example.com')
  })

  it.each(['TURNSTILE_SECRET_KEY', 'BREVO_API_KEY'])(
    'throws when %s is missing',
    (key) => {
      const rest: Record<string, string | undefined> = { ...ok }
      delete rest[key]
      expect(() => parseServerEnv(rest)).toThrow()
    },
  )

  it('accepts a Brevo list alone: the contact is then the whole request', () => {
    const env = parseServerEnv({ TURNSTILE_SECRET_KEY: 's', BREVO_API_KEY: 'k', BREVO_CONTACTS_LIST_ID: '85' })
    expect(env.BREVO_CONTACTS_LIST_ID).toBe(85)
    expect(env.CONTACT_TO).toBeUndefined()
  })

  it('refuses an environment where the form would reach nobody', () => {
    expect(() => parseServerEnv({ TURNSTILE_SECRET_KEY: 's', BREVO_API_KEY: 'k' })).toThrow()
    // A sender without a recipient, or the reverse, is no notification channel either.
    expect(() => parseServerEnv({ TURNSTILE_SECRET_KEY: 's', BREVO_API_KEY: 'k', BREVO_SENDER_EMAIL: 'a@b.fr' })).toThrow()
    expect(() => parseServerEnv({ TURNSTILE_SECRET_KEY: 's', BREVO_API_KEY: 'k', CONTACT_TO: 'a@b.fr' })).toThrow()
  })

  it('refuses a secret-looking NEXT_PUBLIC variable', () => {
    expect(() => parseServerEnv({ ...ok, NEXT_PUBLIC_API_KEY: 'leak' })).toThrow()
    expect(() => parseServerEnv({ ...ok, NEXT_PUBLIC_BREVO_SECRET: 'leak' })).toThrow()
  })

  it('allows the public Turnstile site key', () => {
    expect(() => parseServerEnv({ ...ok, NEXT_PUBLIC_TURNSTILE_SITE_KEY: '0x4AAA' })).not.toThrow()
  })
})
