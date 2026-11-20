import Link from "next/link";
import { MobileMenu } from "@/components/nav/MobileMenu";

const navLinks = [
  { href: "/#exposition", label: "L’exposition" },
  { href: "/#oeuvres", label: "Œuvres" },
  { href: "/#artiste", label: "L’artiste" },
  { href: "/#visite", label: "Visite" },
  { href: "/#faq", label: "FAQ" },
];

export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
    >
      Aller au contenu
    </a>
  );
}

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper">
      <div className="mx-auto flex max-w-(--container-site) items-center justify-between gap-6 px-6 py-4 md:px-10">
        <Link href="/" className="shrink-0 whitespace-nowrap font-display text-lead text-ink">
          Jean-Paul Boyer <span className="text-ink-soft md:hidden lg:inline">exposition</span>
        </Link>
        <nav
          className="hidden items-center gap-6 font-body text-[0.8125rem] text-ink-text md:flex"
          aria-label="Navigation principale"
        >
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-accent">{l.label}</Link>
          ))}
          <Link href="/#inscription" className="btn whitespace-nowrap px-5 py-2.5">Je m’inscris</Link>
        </nav>
        <MobileMenu
          links={navLinks}
          cta={{ href: "/#inscription", label: "Je m’inscris" }}
          openLabel="Ouvrir le menu"
          closeLabel="Fermer le menu"
          buttonClassName="-mr-2.5 text-ink"
          panelClassName="border-b border-line bg-paper px-6 pb-8 pt-2"
          linkClassName="block border-t border-line py-4 font-display text-lead text-ink first:border-t-0 hover:text-accent"
          ctaClassName="btn mt-4 w-full"
        />
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-paper-deep text-ink-soft">
      <div className="mx-auto flex max-w-(--container-site) flex-col gap-2 px-6 py-10 text-caption md:flex-row md:items-center md:justify-between md:px-10">
        <span>© 2026 Jean-Paul Boyer × Very Art Gallery</span>
        <div className="flex items-center gap-5">
          <a
            href="https://www.facebook.com/jeanpaul.boyer.5876/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook de Jean-Paul Boyer"
            className="text-ink-soft transition-colors hover:text-ink"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.4-1.7 1.8-1.7h1.6V3.9c-.3 0-1.3-.2-2.4-.2-2.5 0-4.2 1.5-4.2 4.3v2.5H7.5v3.3h2.8V22h3.2z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/boyersculpture93/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Jean-Paul Boyer"
            className="text-ink-soft transition-colors hover:text-ink"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <Link href="/mentions-legales" className="link">Mentions légales</Link>
        </div>
      </div>
    </footer>
  );
}

export default function Misc() {
  return (
    <>
      <SkipLink />
      <Header />
    </>
  );
}
