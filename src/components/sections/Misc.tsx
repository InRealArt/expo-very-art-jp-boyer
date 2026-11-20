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
