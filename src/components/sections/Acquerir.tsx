const steps = [
  {
    n: "01",
    title: "Visiter",
    text: "Découvrez les œuvres librement du 2 au 6 décembre, ou lors d’un rendez-vous avec l’artiste.",
    span: "lg:col-span-5",
  },
  {
    n: "02",
    title: "Échanger",
    text: "Rencontrez Jean-Paul Boyer au vernissage du samedi 5 décembre et parlez avec lui des œuvres qui vous intéressent.",
    span: "lg:col-span-4",
  },
  {
    n: "03",
    title: "Acquérir",
    text: "[Certificat d’authenticité, livraison et installation : à préciser.]",
    span: "lg:col-span-3",
  },
];

export default function Acquerir() {
  return (
    <section id="acquerir" className="on-ink py-24 lg:py-36">
      <div className="mx-auto max-w-(--container-site) px-6 lg:px-10">
        <div className="max-w-[65ch]">
          <p className="overline">Collectionner Boyer</p>
          <h2 className="mt-4 font-display text-h2 font-normal leading-[1.1] tracking-[-0.01em] text-paper">
            Acquérir une œuvre de l’exposition
          </h2>
          <p className="mt-5 text-lead leading-[1.65] text-on-ink-soft">
            Les cinq sculptures exposées sont disponibles à l’acquisition. Jean-Paul Boyer vous accompagne de la première visite à l’installation chez vous.
          </p>
        </div>
        <ol className="mt-16 grid list-none gap-10 lg:grid-cols-12 lg:gap-0">
          {steps.map((s) => (
            <li
              key={s.n}
              className={`border-t border-on-ink-line pt-6 lg:px-6 lg:first:pl-0 lg:last:pr-0 ${s.span}`}
            >
              <span className="font-display text-h3 text-accent-light">{s.n}</span>
              <h3 className="mt-4 font-display text-h3 font-normal leading-[1.1] text-paper">{s.title}</h3>
              <p className="mt-3 leading-[1.65] text-on-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
