import { describe, expect, it } from 'vitest'
import { checkField, checkFields, defaultValidationMessages as m, type FieldSnapshot } from '../lib/forms/validate'

const field = (over: Partial<FieldSnapshot> = {}): FieldSnapshot => ({
  name: 'f',
  label: 'Prénom',
  type: 'text',
  value: '',
  checked: false,
  required: false,
  minLength: -1,
  maxLength: -1,
  ...over,
})

describe('checkField', () => {
  it('accepts an empty optional field', () => {
    expect(checkField(field())).toBeNull()
    expect(checkField(field({ type: 'email' }))).toBeNull()
  })

  it('refuses an empty or blank required field and names it', () => {
    expect(checkField(field({ required: true }))).toBe(m.required('Prénom'))
    expect(checkField(field({ required: true, value: '   ' }))).toBe(m.required('Prénom'))
  })

  it('refuses an unticked required box and accepts a ticked one', () => {
    expect(checkField(field({ type: 'checkbox', required: true }))).toBe(m.consent)
    expect(checkField(field({ type: 'checkbox', required: true, checked: true }))).toBeNull()
    expect(checkField(field({ type: 'checkbox' }))).toBeNull()
  })

  it.each(['ada', 'ada@', 'ada@example', 'ada@example.', '@example.fr', 'a da@example.fr'])('refuses the address %j', (value) => {
    expect(checkField(field({ type: 'email', value }))).toBe(m.email)
  })

  it('accepts a real address, even when optional', () => {
    expect(checkField(field({ type: 'email', value: 'ada@example.fr' }))).toBeNull()
  })

  it.each(['abc', '12', '06 13 8', '06-abc-4591'])('refuses the phone %j', (value) => {
    expect(checkField(field({ type: 'tel', value }))).toBe(m.tel)
  })

  it.each(['06 13 80 45 91', '+33 6 13 80 45 91', '(01) 42.00.00.00'])('accepts the phone %j', (value) => {
    expect(checkField(field({ type: 'tel', value }))).toBeNull()
  })

  it('applies the length limits and the pattern of the control', () => {
    expect(checkField(field({ value: 'ab', minLength: 3 }))).toBe(m.tooShort('Prénom', 3))
    expect(checkField(field({ value: 'abcdef', maxLength: 5 }))).toBe(m.tooLong('Prénom', 5))
    expect(checkField(field({ value: 'x1', pattern: '[a-z]+' }))).toBe(m.pattern('Prénom'))
    expect(checkField(field({ value: 'xy', pattern: '[a-z]+' }))).toBeNull()
  })

  it('ignores a pattern it cannot compile', () => {
    expect(checkField(field({ value: 'x', pattern: '(' }))).toBeNull()
  })

  it('takes custom messages', () => {
    const custom = { ...m, required: (l: string) => `Missing ${l}` }
    expect(checkField(field({ required: true }), custom)).toBe('Missing Prénom')
  })
})

describe('checkFields', () => {
  it('lists every problem, in order, and nothing for a valid form', () => {
    const issues = checkFields([
      field({ name: 'a', required: true }),
      field({ name: 'b', type: 'email', value: 'ok@example.fr' }),
      field({ name: 'c', type: 'checkbox', required: true }),
    ])
    expect(issues.map((i) => i.name)).toEqual(['a', 'c'])
    expect(checkFields([field({ name: 'b', type: 'email', value: 'ok@example.fr' })])).toEqual([])
  })
})
