import { describe, expect, it } from 'vitest'
import { handleForm } from '../lib/forms/action'
import { buildFormSchema } from '../lib/forms/schema'

const schema = buildFormSchema([
  { name: 'name', type: 'text', required: true, max: 80 },
  { name: 'email', type: 'email', required: true, max: 254 },
])

const formData = (extra: Record<string, string> = {}) => {
  const fd = new FormData()
  fd.set('name', 'Ada')
  fd.set('email', 'ada@example.com')
  fd.set('cf-turnstile-response', 'tok')
  for (const [k, v] of Object.entries(extra)) fd.set(k, v)
  return fd
}

function run(fd: FormData) {
  const sent: Record<string, string>[] = []
  return {
    sent,
    result: handleForm({
      formData: fd,
      headers: new Headers(),
      schema,
      turnstile: { action: 'contact', hostname: 'x.test', secret: 's' },
      limiter: () => true,
      verify: async () => ({ ok: true }),
      send: async (data) => {
        sent.push(data)
      },
    }),
  }
}

describe('React internal form fields', () => {
  it('accepts the hidden $ACTION_* fields React adds to a Server Action form, and never forwards them', async () => {
    const { result, sent } = run(
      formData({
        $ACTION_REF_1: '',
        '$ACTION_1:0': '{"id":"abc123","bound":"$@1"}',
        '$ACTION_1:1': '[null]',
        $ACTION_KEY: 'k1234567890',
        $ACTION_ID_abc123: '',
      }),
    )
    expect(await result).toEqual({ ok: true })
    expect(Object.keys(sent[0]).sort()).toEqual(['email', 'name'])
  })

  it('still refuses any other unknown field', async () => {
    const { result } = run(formData({ admin: 'yes' }))
    expect(await result).toEqual({ ok: false, error: 'invalid' })
  })

  it('does not let a look-alike name through: only the exact $ACTION_ prefix is ignored', async () => {
    expect(await run(formData({ ACTION_x: '1' })).result).toEqual({ ok: false, error: 'invalid' })
    expect(await run(formData({ $action_x: '1' })).result).toEqual({ ok: false, error: 'invalid' })
  })
})
