import Image from "next/image";

const works = [
  {
    src: "/images/sm703-double-volume-1.webp",
    w: 1400,
    h: 1050,
    alt: "Double volume, anneaux de lames d’acier sur socle de pierre noire",
    title: "Double volume",
    meta: "sm 703 · Acier laqué époxy incolore · H. 65 cm",
    price: "4 500 €",
    cls: "md:col-span-7",
  },
  {
    src: "/images/sm760-formes-en-u-2.webp",
    w: 1077,
    h: 1400,
    alt: "Formes en U, lames blanches en éventail autour d’une tige",
    title: "Formes en U",
    meta: "sm 760 · Acier laqué · H. 86 cm",
    price: "4 500 €",
    cls: "md:col-span-5 md:mt-24",
  },
  {
    src: "/images/sm776-lames-bleues-1.webp",
    w: 1050,
    h: 1400,
    alt: "Lames bleues, rubans bleus autour d’un axe",
    title: "Lames bleues",
    meta: "sm 776 · Acier laqué · H. 76 cm",
    price: "2 500 €",
    cls: "md:col-span-4",
  },
  {
    src: "/images/sm792-dix-petites-lames-3.webp",
    w: 1050,
    h: 1400,
    alt: "Dix petites lames bleues et or en forme de vague",
    title: "Dix petites lames bleues et or",
    meta: "sm 792 · H. 42 cm",
    price: "1 600 €",
    cls: "md:col-span-4 md:mt-16",
  },
  {
    src: "/images/sm847-triple-volute-1.webp",
    w: 1050,
    h: 1400,
    alt: "Triple volute, lames d’acier en S autour d’un axe",
    title: "Triple volute",
    meta: "sm 847 · Acier laqué · H. 100 cm",
    price: "5 000 €",
    cls: "md:col-span-4",
  },
];

const spec: [string, string][] = [
  ["Artiste", "Jean-Paul Boyer"],
  ["Référence", "sm 847"],
  ["Matière", "Acier laqué"],
  ["Hauteur", "100 cm"],
  ["Prix", "5 000 €"],
  ["Statut", "Disponible à l’acquisition"],
];

export default function Mosaique() {
  return (
    <div className="bg-paper-deep">
      <section
        className="mx-auto max-w-site px-6 pt-24 md:px-10 md:pt-36"
        aria-label="Aperçu des œuvres"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Image
              src="/images/sm703-double-volume-2.webp"
              width={1400}
              height={1050}
              loading="lazy"
              alt="Double volume, sphère de lames d’acier sur socle de pierre"
              className="h-auto w-full"
            />
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <Image
              src="/images/sm776-lames-bleues-2.webp"
              width={1115}
              height={1400}
              loading="lazy"
              alt="Lames bleues, rubans d’acier bleu nuit et bleu roi"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site px-6 py-24 md:px-10 md:py-36">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <Image
              src="/images/sm847-triple-volute-3.webp"
              width={1050}
              height={1400}
              loading="lazy"
              alt="Triple volute sur sa tige et son socle"
              className="h-auto w-full"
            />
          </div>
          <div className="card p-8 md:col-span-5 md:p-10">
            <p className="overline">Œuvre phare</p>
            <h2 className="mt-4 font-display text-h2 leading-[1.1] tracking-[-0.01em] text-ink">
              Triple volute
            </h2>
            <dl className="mt-8">
              {spec.map(([dt, dd]) => (
                <div
                  key={dt}
                  className="flex flex-wrap justify-between gap-4 border-t border-line py-3 first:border-t-0"
                >
                  <dt className="text-caption text-ink-soft">{dt}</dt>
                  <dd
                    className={
                      dt === "Prix"
                        ? "font-display text-h3 text-ink"
                        : "text-ink-text"
                    }
                  >
                    {dd}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section
        id="oeuvres"
        className="mx-auto max-w-site px-6 pb-24 md:px-10 md:pb-36"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="overline">Parcours</p>
            <h2 className="mt-4 font-display text-h2 leading-[1.1] tracking-[-0.01em] text-ink">
              Œuvres présentées
            </h2>
          </div>
          <p className="text-caption text-ink-soft">Pièces uniques, signées</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-12">
          {works.map((w) => (
            <figure
              key={w.title + w.src}
              className={`card card-hover m-0 ${w.cls}`}
            >
              <Image
                src={w.src}
                width={w.w}
                height={w.h}
                loading="lazy"
                alt={w.alt}
                className="h-auto w-full"
              />
              <figcaption className="p-6">
                <h3 className="font-display text-h3 leading-[1.1] text-ink">
                  {w.title}
                </h3>
                <p className="mt-2 text-caption text-ink-soft">{w.meta}</p>
                <p className="mt-3 font-display text-lead text-ink">
                  {w.price}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
