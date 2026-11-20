import type { Metadata } from "next";
import { Footer, Header, SkipLink } from "@/components/sections/Misc";

export const metadata: Metadata = {
  title: "Mentions légales · Jean-Paul Boyer, sculptures",
  description:
    "Mentions légales du site de l’exposition de Jean-Paul Boyer à la Very Art Gallery : éditeur, hébergement, données personnelles et cookies.",
  robots: { index: true, follow: true },
};

export default function MentionsLegales() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main" className="bg-paper pt-20">
        <div className="mx-auto max-w-(--container-site) px-6 py-24 md:px-10 lg:py-36">
          <p className="eyebrow">Informations légales</p>
          <h1 className="mt-4 font-display text-h2 font-normal leading-[1.1] tracking-[-0.01em] text-ink">
            Mentions légales
          </h1>

          <div className="mt-12 max-w-[65ch] space-y-12 text-[1.0625rem] leading-[1.65] text-ink-text">
            <section aria-labelledby="editeur">
              <h2 id="editeur" className="font-display text-h3 font-normal leading-[1.1] text-ink">
                Éditeur du site
              </h2>
              <p className="mt-4">
                Ce site est la propriété de Jean-Paul Boyer, sculpteur.
              </p>
              <address className="mt-4 not-italic">
                Jean-Paul Boyer
                <br />
                25 rue de la Montagne
                <br />
                91360 Épinay-sur-Orge, France
                <br />
                Téléphone : <a className="link" href="tel:+33613804591">+33 6 13 80 45 91</a>
                <br />
                E-mail : <a className="link" href="mailto:boyer-sculpture@sfr.fr">boyer-sculpture@sfr.fr</a>
              </address>
              <p className="mt-4">
                L’exposition présentée sur ce site a lieu à la Very Art Gallery, 21 rue Michel Le Comte, 75003 Paris.
              </p>
            </section>

            <section aria-labelledby="hebergement">
              <h2 id="hebergement" className="font-display text-h3 font-normal leading-[1.1] text-ink">
                Hébergement
              </h2>
              <p className="mt-4">
                [Nom de l’hébergeur, forme juridique, adresse du siège et numéro d’immatriculation : à confirmer.]
              </p>
            </section>

            <section aria-labelledby="donnees">
              <h2 id="donnees" className="font-display text-h3 font-normal leading-[1.1] text-ink">
                Collecte et protection des données
              </h2>
              <p className="mt-4">
                Des données personnelles sont collectées uniquement par le formulaire d’inscription (prénom, nom, adresse e-mail, téléphone, objet de la demande, nombre de personnes et message). Elles servent à répondre à votre demande, à confirmer votre venue au vernissage ou à organiser une visite avec l’artiste, et ne sont utilisées pour aucun autre usage.
              </p>
              <p className="mt-4">
                Si vous cochez la case correspondante, votre adresse e-mail peut aussi servir à vous informer des prochaines expositions de Jean-Paul Boyer. Cette case est facultative.
              </p>
              <p className="mt-4">
                Votre adresse IP n’est pas conservée. Aucune donnée n’est stockée directement sur le site : les messages sont transmis par e-mail à l’éditeur, qui applique des mesures de sécurité adaptées pour protéger vos informations.
              </p>
              <p className="mt-4">
                Conformément au règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés, vous disposez d’un droit d’accès, de rectification, d’effacement et d’opposition sur vos données. Pour l’exercer, écrivez à{" "}
                <a className="link" href="mailto:boyer-sculpture@sfr.fr">boyer-sculpture@sfr.fr</a>. Vous pouvez aussi saisir la CNIL (<a className="link" href="https://www.cnil.fr" rel="noopener noreferrer">cnil.fr</a>).
              </p>
            </section>

            <section aria-labelledby="cookies">
              <h2 id="cookies" className="font-display text-h3 font-normal leading-[1.1] text-ink">
                Cookies et protection anti-spam
              </h2>
              <p className="mt-4">
                Le formulaire est protégé contre les envois automatisés par un dispositif anti-spam (Cloudflare Turnstile), qui peut déposer ou lire des informations techniques sur votre appareil pour distinguer un visiteur d’un robot. [À valider selon la configuration finale du site, ainsi que la durée de conservation des éventuels cookies.]
              </p>
            </section>

            <section aria-labelledby="propriete">
              <h2 id="propriete" className="font-display text-h3 font-normal leading-[1.1] text-ink">
                Propriété intellectuelle
              </h2>
              <p className="mt-4">
                Les photographies, textes et œuvres présentés sur ce site sont protégés par le droit d’auteur. Toute reproduction ou représentation, totale ou partielle, sans l’accord écrit de Jean-Paul Boyer est interdite.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
