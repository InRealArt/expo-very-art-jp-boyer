/** What the checker needs to know about one control, read from the DOM by the form shell. */
export interface FieldSnapshot {
  name: string
  /** Visible label of the control, used in the error message. */
  label: string
  type: string
  value: string
  checked: boolean
  required: boolean
  minLength: number
  maxLength: number
  pattern?: string
}

export interface ValidationMessages {
  required: (label: string) => string
  consent: (label: string) => string
  email: string
  tel: string
  tooShort: (label: string, min: number) => string
  tooLong: (label: string, max: number) => string
  pattern: (label: string) => string
}

/** Plain French messages. They name the field and say what to do, never how the server checks it. */
export const defaultValidationMessages: ValidationMessages = {
  required: (label) => `${label} : ce champ est obligatoire.`,
  consent: (label) => `Merci de cocher la case « ${label} »`,
  email: 'Cette adresse e-mail semble incomplète.',
  tel: 'Ce numéro de téléphone semble incorrect.',
  tooShort: (label, min) => `${label} : ${min} caractères minimum.`,
  tooLong: (label, max) => `${label} : ${max} caractères maximum.`,
  pattern: (label) => `${label} : le format n’est pas valide.`,
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^\+?[\d\s().-]+$/

/** First problem of one field, or null. The same rules run on every field, unless the page opts out of the check. */
export function checkField(f: FieldSnapshot, m: ValidationMessages = defaultValidationMessages): string | null {
  if (f.type === 'checkbox') return f.required && !f.checked ? m.consent(f.label) : null

  const value = f.value.trim()
  if (value === '') return f.required ? m.required(f.label) : null

  if (f.type === 'email' && !EMAIL.test(value)) return m.email
  if (f.type === 'tel' && !(PHONE.test(value) && value.replace(/\D/g, '').length >= 6)) return m.tel
  if (f.minLength > 0 && value.length < f.minLength) return m.tooShort(f.label, f.minLength)
  if (f.maxLength > 0 && value.length > f.maxLength) return m.tooLong(f.label, f.maxLength)
  if (f.pattern) {
    try {
      if (!new RegExp(`^(?:${f.pattern})$`, 'u').test(value)) return m.pattern(f.label)
    } catch {
      // A pattern the browser cannot compile is the page's mistake: do not block the visitor with it.
    }
  }
  return null
}

export interface FieldIssue {
  name: string
  message: string
}

export function checkFields(fields: FieldSnapshot[], m: ValidationMessages = defaultValidationMessages): FieldIssue[] {
  return fields.flatMap((f) => {
    const message = checkField(f, m)
    return message ? [{ name: f.name, message }] : []
  })
}
