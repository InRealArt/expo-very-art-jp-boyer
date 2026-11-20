'use client'

import { useActionState, useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { HONEYPOT_FIELD, TURNSTILE_FIELD } from '../../lib/forms/constants'
import { idleState, messageFor, type FormMessages, type FormState } from '../../lib/forms/state'
import {
  checkFields,
  defaultValidationMessages,
  type FieldIssue,
  type FieldSnapshot,
  type ValidationMessages,
} from '../../lib/forms/validate'
import { TurnstileWidget } from './TurnstileWidget'

/** Confirmation dialog shown once the form is sent. Colors, radius and type come from the design through the class props. */
export interface SuccessModal {
  title: string
  /** Text of the dialog. A function receives the submitted values, for instance to greet the visitor by first name. */
  message: ReactNode | ((values: Record<string, string>) => ReactNode)
  closeLabel: string
  dialogClassName?: string
  panelClassName?: string
  iconClassName?: string
  titleClassName?: string
  textClassName?: string
  buttonClassName?: string
}

interface SecureFormProps {
  /** The generated Server Action, for example `submitContact`. */
  action: (previous: FormState, formData: FormData) => Promise<FormState>
  /** Must match `turnstile.action` of the form in the brief. */
  turnstileAction: string
  children: ReactNode
  className?: string
  /** Class of the status line; the line has `data-state` set to idle, success or error. */
  statusClassName?: string
  messages?: Partial<FormMessages>
  /** Shown in a modal dialog after a successful send. Without it, the success message appears in the status line. */
  successModal?: SuccessModal
  /** Every field is checked in the browser before sending. Set to false only for a form the browser must not check. */
  validate?: boolean
  validationMessages?: Partial<ValidationMessages>
  /** Heading of the list of problems shown above the submit button. */
  errorTitle?: string
  /** Class of the list of problems. Fields with a problem get `aria-invalid="true"`: style that in the design. */
  errorClassName?: string
}

const SKIPPED_TYPES = new Set(['hidden', 'submit', 'button', 'reset', 'image', 'file', 'radio'])

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

function controlsOf(form: HTMLFormElement): Control[] {
  return Array.from(form.elements).filter((el): el is Control => {
    if (!(el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement)) return false
    if (!el.name || el.disabled || el.name === HONEYPOT_FIELD || el.name === TURNSTILE_FIELD) return false
    return !(el instanceof HTMLInputElement && SKIPPED_TYPES.has(el.type))
  })
}

function snapshot(el: Control): FieldSnapshot {
  const label = el.labels?.[0]?.textContent?.replace(/\s+/g, ' ').trim() || el.getAttribute('aria-label') || el.name
  const text = el instanceof HTMLSelectElement ? null : el
  return {
    name: el.name,
    label: label.replace(/\s*\(facultatif\)\s*$/i, ''),
    type: el instanceof HTMLInputElement ? el.type : el instanceof HTMLSelectElement ? 'select' : 'textarea',
    value: el.value,
    checked: el instanceof HTMLInputElement ? el.checked : false,
    required: el.required,
    minLength: text ? text.minLength : -1,
    maxLength: text ? text.maxLength : -1,
    pattern: el instanceof HTMLInputElement ? el.pattern || undefined : undefined,
  }
}

/**
 * Form shell: anti-spam trap, Turnstile challenge, check of every field, submission state,
 * visitor messages and the confirmation dialog.
 * Only the fields and the submit button come from the page; no security code lives in the page.
 */
export function SecureForm({
  action,
  turnstileAction,
  children,
  className,
  statusClassName,
  messages,
  successModal,
  validate = true,
  validationMessages,
  errorTitle = 'Merci de corriger les points suivants :',
  errorClassName,
}: SecureFormProps) {
  const [state, formAction, pending] = useActionState(action, idleState)
  const [issues, setIssues] = useState<FieldIssue[]>([])
  const [sent, setSent] = useState<Record<string, string>>({})
  const form = useRef<HTMLFormElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const summary = useRef<HTMLDivElement>(null)
  const checked = useRef(false)
  const titleId = useId()
  const textId = useId()
  const rules = { ...defaultValidationMessages, ...validationMessages }

  const run = () => {
    const el = form.current
    if (!el) return []
    const controls = controlsOf(el)
    const found = checkFields(controls.map(snapshot), rules)
    const bad = new Set(found.map((i) => i.name))
    for (const c of controls) {
      if (bad.has(c.name)) c.setAttribute('aria-invalid', 'true')
      else c.removeAttribute('aria-invalid')
    }
    setIssues(found)
    return found
  }

  // A confirmed send: open the dialog and leave an empty form for the next visitor.
  useEffect(() => {
    if (state.status !== 'success') return
    checked.current = false
    if (successModal && dialog.current && !dialog.current.open) dialog.current.showModal()
    form.current?.reset()
  }, [state]) // eslint-disable-line react-hooks/exhaustive-deps

  const message = successModal && state.status === 'success' ? null : messageFor(state, messages)

  return (
    <>
      <form
        ref={form}
        action={formAction}
        noValidate={validate}
        className={className}
        aria-busy={pending}
        data-pending={pending || undefined}
        onSubmit={(event) => {
          if (pending) return event.preventDefault()
          const keep = () =>
            setSent(
              Object.fromEntries(
                [...new FormData(event.currentTarget).entries()].filter((e): e is [string, string] => typeof e[1] === 'string'),
              ),
            )
          if (!validate) return keep()
          checked.current = true
          const found = run()
          if (found.length === 0) return keep()
          event.preventDefault()
          const first = form.current?.elements.namedItem(found[0].name)
          if (first instanceof HTMLElement) first.focus({ preventScroll: true })
          summary.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
        }}
        // Once the visitor has tried to send, every change is rechecked so the list shrinks as problems are fixed.
        onChange={() => checked.current && run()}
        onBlur={(event) => {
          const t = event.target
          if (checked.current && (t instanceof HTMLInputElement || t instanceof HTMLSelectElement || t instanceof HTMLTextAreaElement)) run()
        }}
      >
        <div ref={summary} role="alert" className={issues.length ? errorClassName : undefined} hidden={issues.length === 0} style={{ scrollMarginTop: '6rem' }}>
          <p>{errorTitle}</p>
          <ul>
            {issues.map((i) => (
              <li key={i.name}>
                <a
                  href={`#${i.name}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const target = form.current?.elements.namedItem(i.name)
                    if (target instanceof HTMLElement) target.focus()
                  }}
                >
                  {i.message}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {children}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
          <label>
            Ne pas remplir
            <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <TurnstileWidget action={turnstileAction} resetSignal={state} />
        <p role="status" aria-live="polite" className={statusClassName} data-state={state.status}>
          {message}
        </p>
      </form>
      {successModal ? (
        <dialog
          ref={dialog}
          aria-labelledby={titleId}
          aria-describedby={textId}
          className={`m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg overflow-visible border-0 bg-transparent p-0 ${successModal.dialogClassName ?? ''}`}
          onClick={(event) => event.target === event.currentTarget && event.currentTarget.close()}
        >
          <div className={`relative ${successModal.panelClassName ?? ''}`}>
            <svg
              aria-hidden="true"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-12 w-12 ${successModal.iconClassName ?? ''}`}
            >
              <circle cx="24" cy="24" r="21" />
              <path d="M14.5 25.5l6.5 6.5 12.5-14" />
            </svg>
            <h2 id={titleId} className={successModal.titleClassName}>
              {successModal.title}
            </h2>
            <div id={textId} className={successModal.textClassName}>
              {typeof successModal.message === 'function' ? successModal.message(sent) : successModal.message}
            </div>
            <form method="dialog">
              <button type="submit" autoFocus className={successModal.buttonClassName}>
                {successModal.closeLabel}
              </button>
            </form>
          </div>
        </dialog>
      ) : null}
    </>
  )
}
