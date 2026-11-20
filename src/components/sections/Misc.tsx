import Link from "next/link";

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
          Jean-Paul Boyer <span className="text-ink-soft md:hidden lg:inline">× Very Art Gallery</span>
        </Link>
        <nav
          className="hidden items-center gap-6 font-body text-[0.8125rem] text-ink-text md:flex"
          aria-label="Navigation principale"
        >
          <Link href="/#exposition" className="hover:text-accent">L’exposition</Link>
          <Link href="/#oeuvres" className="hover:text-accent">Œuvres</Link>
          <Link href="/#artiste" className="hover:text-accent">L’artiste</Link>
          <Link href="/#visite" className="hover:text-accent">Visite</Link>
          <Link href="/#faq" className="hover:text-accent">FAQ</Link>
          <Link href="/#inscription" className="btn whitespace-nowrap px-5 py-2.5">Je m’inscris</Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-paper-deep text-ink-soft">
      <div className="mx-auto flex max-w-(--container-site) flex-col gap-2 px-6 py-10 text-caption md:flex-row md:items-center md:justify-between md:px-10">
        <span>© 2026 Jean-Paul Boyer × Very Art Gallery</span>
        <Link href="/mentions-legales" className="link">Mentions légales</Link>
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
