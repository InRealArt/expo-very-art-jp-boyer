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
        <a href="#top" className="font-display text-lead text-ink">
          Jean-Paul Boyer <span className="text-ink-soft">× Very Art Gallery</span>
        </a>
        <nav
          className="hidden items-center gap-6 font-body text-[0.8125rem] text-ink-text md:flex"
          aria-label="Navigation principale"
        >
          <a href="#exposition" className="hover:text-accent">L’exposition</a>
          <a href="#oeuvres" className="hover:text-accent">Œuvres</a>
          <a href="#artiste" className="hover:text-accent">L’artiste</a>
          <a href="#visite" className="hover:text-accent">Visite</a>
          <a href="#faq" className="hover:text-accent">FAQ</a>
          <a href="#inscription" className="btn px-5 py-2.5">Je m’inscris</a>
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
