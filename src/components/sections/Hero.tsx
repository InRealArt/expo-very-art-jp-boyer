import Image from "next/image";

export default function Hero() {
  return (
    <section id="top" className="bg-paper">
      <div className="mx-auto grid w-full max-w-(--container-site) grid-cols-1 gap-10 px-6 pt-32 pb-24 md:px-10 lg:grid-cols-12 lg:gap-16 lg:pt-40 lg:pb-36">
        <div className="lg:col-span-7">
          <p className="overline">Exposition · Sculpture</p>
          <h1 className="mt-6 font-display text-(length:--text-display) leading-[1.1] tracking-[-0.01em] text-ink">
            Jean-Paul <em className="block italic">Boyer</em>
          </h1>
          <p className="mt-6 font-display text-(length:--text-h3) text-ink">
            [Titre de l’exposition] à la Very Art Gallery
          </p>
          <p className="mt-6 max-w-[65ch] text-(length:--text-lead) leading-[1.65] text-ink-text">
            Cinq sculptures récentes en acier laqué, réunies pendant cinq jours au cœur du Marais. Des lames fines, cintrées et assemblées autour d’un axe, qui dessinent des volumes ouverts à la lumière.
          </p>
          <dl className="mt-10 grid grid-cols-1 border-y border-line md:grid-cols-3 md:divide-x md:divide-line">
            <div className="py-4 md:px-4 md:first:pl-0">
              <dt className="overline">Dates</dt>
              <dd className="mt-2 text-ink-text">Du 2 au 6 décembre 2026</dd>
            </div>
            <div className="border-t border-line py-4 md:border-t-0 md:px-4">
              <dt className="overline">Lieu</dt>
              <dd className="mt-2 text-ink-text">21 rue Michel Le Comte, Paris 3e</dd>
            </div>
            <div className="border-t border-line py-4 md:border-t-0 md:px-4">
              <dt className="overline">Vernissage</dt>
              <dd className="mt-2 text-ink-text">Samedi 5 décembre, 18 h</dd>
            </div>
          </dl>
          <div className="mt-10">
            <a href="#inscription" className="btn">Je m’inscris</a>
          </div>
        </div>
        <figure className="lg:col-span-5">
          <div className="relative aspect-[3/4] w-full overflow-hidden border border-line">
            <Image
              src="/images/sm764-triple-volute.webp"
              width={3000}
              height={4000}
              alt="Jean-Paul Boyer, Triple volute, acier laqué, hauteur 100 cm"
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 text-(length:--text-caption) text-ink-soft">
            Triple volute, acier laqué, H. 100 cm
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
