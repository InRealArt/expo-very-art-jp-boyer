import { Reveal } from "@/components/motion/Reveal";
const infos: { dt: string; dd: React.ReactNode }[] = [
  {
    dt: "Adresse",
    dd: (
      <>
        Very Art Gallery
        <br />
        21 rue Michel Le Comte, 75003 Paris
      </>
    ),
  },
  { dt: "Dates", dd: "Du mercredi 2 au dimanche 6 décembre 2026" },
  { dt: "Horaires", dd: "Du mercredi au dimanche, de 12 h à 19 h" },
  { dt: "Vernissage", dd: "Samedi 5 décembre 2026 à 18 h, sur inscription" },
  { dt: "Accès", dd: "Métro Rambuteau (ligne 11) ou Arts et Métiers (lignes 3 et 11)" },
  {
    dt: "Contact",
    dd: (
      <>
        <a className="link" href="tel:+33613804591">06 13 80 45 91</a>
        <br />
        <a className="link" href="mailto:boyer-sculpture@sfr.fr">boyer-sculpture@sfr.fr</a>
      </>
    ),
  },
];

export default function Visite() {
  return (
    <section id="visite" className="bg-paper py-24 lg:py-36">
      <div className="mx-auto grid max-w-(--container-site) gap-10 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div>
          <p className="eyebrow">Informations pratiques</p>
          <h2 className="mt-4 font-display text-h2 font-normal leading-[1.1] tracking-[-0.01em] text-ink">
            Visiter l’exposition
          </h2>
          <Reveal as="dl" className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {infos.map(({ dt, dd }) => (
              <div key={dt} className="border-t border-line pt-4">
                <dt className="eyebrow">{dt}</dt>
                <dd className="mt-2 leading-[1.65] text-ink-text">{dd}</dd>
              </div>
            ))}
          </Reveal>
        </div>
        <div className="min-h-80 border border-line lg:min-h-full">
          <iframe
            title="Carte : Very Art Gallery, 21 rue Michel Le Comte, Paris 3e"
            src="https://www.google.com/maps?q=Very+Art+Gallery,+21+rue+Michel+Le+Comte,+75003+Paris&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-80 w-full border-0 lg:min-h-[28rem]"
          />
        </div>
      </div>
    </section>
  );
}
