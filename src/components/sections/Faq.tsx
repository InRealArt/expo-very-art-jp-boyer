const items: { q: string; a: React.ReactNode }[] = [
  {
    q: "En quoi consiste l’exposition de Jean-Paul Boyer ?",
    a: "L’exposition réunit cinq sculptures récentes de Jean-Paul Boyer en acier laqué, de 42 à 100 cm, à la Very Art Gallery du mercredi 2 au dimanche 6 décembre 2026. Un vernissage en présence de l’artiste a lieu le samedi 5 décembre à 18 h. Toutes les œuvres sont disponibles à l’acquisition.",
  },
  {
    q: "Quels sont les horaires d’ouverture ?",
    a: "L’exposition est ouverte du mercredi 2 au dimanche 6 décembre 2026, [horaires d’ouverture]. Le vernissage a lieu le samedi 5 décembre à 18 h.",
  },
  {
    q: "Où se situe la Very Art Gallery ?",
    a: "Au 21 rue Michel Le Comte, 75003 Paris, dans le Marais, près des métros Rambuteau (ligne 11) et Arts et Métiers (lignes 3 et 11).",
  },
  {
    q: "Faut-il s’inscrire pour le vernissage ?",
    a: "Oui, avec le formulaire de cette page. Indiquez le nombre de personnes qui vous accompagnent : nous vous confirmons votre venue par e-mail.",
  },
  {
    q: "Les œuvres exposées sont-elles à vendre ?",
    a: (
      <>
        Oui. Chaque sculpture est une pièce unique, signée, et son prix est indiqué. Pour réserver une œuvre, choisissez « Information sur une œuvre » dans le formulaire, écrivez à{" "}
        <a className="link" href="mailto:boyer-sculpture@sfr.fr">boyer-sculpture@sfr.fr</a> ou appelez le 06 13 80 45 91.
      </>
    ),
  },
  {
    q: "Peut-on rencontrer l’artiste ?",
    a: "Oui. Jean-Paul Boyer sera présent au vernissage du samedi 5 décembre. Pour le rencontrer un autre jour, choisissez « Organiser une visite avec l’artiste » dans le formulaire.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="bg-paper py-24 lg:py-36">
      <div className="mx-auto grid max-w-(--container-site) gap-10 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-4">
          <p className="overline">FAQ</p>
          <h2 className="mt-4 font-display text-h2 font-normal leading-[1.1] tracking-[-0.01em] text-ink">
            Questions fréquentes
          </h2>
        </div>
        <div className="border-b border-line lg:col-span-8">
          {items.map(({ q, a }, i) => (
            <details key={q} name="faq" open={i === 0} className="group border-t border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-lead text-ink focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
                <span>{q}</span>
                <span aria-hidden="true" className="shrink-0 text-accent before:content-['+'] group-open:before:content-['−']" />
              </summary>
              <p className="max-w-[65ch] pb-6 leading-[1.65] text-ink-text">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
