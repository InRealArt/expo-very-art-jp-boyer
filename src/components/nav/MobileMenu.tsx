'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'

export interface MobileMenuLink {
  href: string
  label: string
}

interface MobileMenuProps {
  links: MobileMenuLink[]
  /** Optional call to action shown under the links. */
  cta?: MobileMenuLink
  /** Accessible names of the toggle button, in the language of the page. */
  openLabel: string
  closeLabel: string
  /** Wrapper. Defaults to hidden from the `md` breakpoint up, where the desktop nav takes over. */
  className?: string
  buttonClassName?: string
  /** Colors, border and padding of the panel come from the design, never from here. */
  panelClassName?: string
  linkClassName?: string
  ctaClassName?: string
}

/**
 * Burger button and drop-down panel for the header on small screens.
 * Place it inside the fixed header: the panel opens right under it, full width.
 * Closes on link click, Escape, route change and when the viewport grows to `md`.
 * Without JS the button does nothing and the desktop nav is the only navigation.
 */
export function MobileMenu({
  links,
  cta,
  openLabel,
  closeLabel,
  className = 'md:hidden',
  buttonClassName = '',
  panelClassName = '',
  linkClassName = '',
  ctaClassName = '',
}: MobileMenuProps) {
  // The menu is open for one pathname only, so a route change closes it without an effect.
  const pathname = usePathname()
  const [openAt, setOpenAt] = useState<string | null>(null)
  const open = openAt === pathname
  const setOpen = (value: boolean | ((v: boolean) => boolean)) =>
    setOpenAt((cur) => ((typeof value === 'function' ? value(cur === pathname) : value) ? pathname : null))
  const button = useRef<HTMLButtonElement>(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      button.current?.focus()
    }
    const wide = window.matchMedia('(min-width: 48rem)')
    const onWide = () => wide.matches && setOpen(false)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    wide.addEventListener('change', onWide)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
      wide.removeEventListener('change', onWide)
    }
  }, [open])

  const bar = 'absolute left-0 block h-px w-full bg-current transition-transform duration-300 motion-reduce:transition-none'

  return (
    <div className={className}>
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((v) => !v)}
        className={`group inline-flex h-11 w-11 items-center justify-center ${buttonClassName}`}
      >
        <span aria-hidden="true" className="relative block h-3 w-6">
          <span className={`${bar} top-0 group-aria-expanded:top-1/2 group-aria-expanded:rotate-45`} />
          <span className={`${bar} top-1/2 group-aria-expanded:opacity-0`} />
          <span className={`${bar} top-full group-aria-expanded:top-1/2 group-aria-expanded:-rotate-45`} />
        </span>
      </button>
      <div
        id={panelId}
        hidden={!open}
        className={`absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] overflow-y-auto ${panelClassName}`}
      >
        <nav>
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className={linkClassName}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          {cta ? (
            <Link href={cta.href} onClick={() => setOpen(false)} className={ctaClassName}>
              {cta.label}
            </Link>
          ) : null}
        </nav>
      </div>
    </div>
  )
}
