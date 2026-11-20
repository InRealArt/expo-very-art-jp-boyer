import { Reveal } from "@/components/motion/Reveal";
export default function Regards() {
  return (
    <section id="regards" className="bg-paper-deep py-24 lg:py-36">
      <div className="mx-auto max-w-(--container-site) px-6 lg:px-10">
        <p className="eyebrow">Regards sur l’œuvre</p>
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-16">
          <Reveal as="figure" className="lg:col-span-2">
            <blockquote className="max-w-[40ch] font-display text-h2 font-normal italic leading-[1.2] tracking-[-0.01em] text-ink">
              « [Texte de Timothée Roy sur le travail de Jean-Paul Boyer, à fournir et valider avec lui.] »
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span
                aria-hidden="true"
                className="flex size-12 shrink-0 items-center justify-center border border-line font-display text-ink"
              >
                TR
              </span>
              <span className="flex flex-col text-caption text-ink-soft">
                <b className="font-semibold text-ink">Timothée Roy</b>
                <span>Fondateur d’InRealArt, agent du peintre Alain Pontecorvo</span>
              </span>
            </figcaption>
          </Reveal>
          <Reveal as="figure" delay={0.06} className="border border-line bg-surface p-8 lg:mt-16">
            <blockquote className="font-display text-lead leading-[1.4] text-ink">
              « [Citation du curateur, à fournir et valider avec lui.] »
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-4">
              <span
                aria-hidden="true"
                className="flex size-12 shrink-0 items-center justify-center border border-line font-display text-ink"
              >
                ··
              </span>
              <span className="flex flex-col text-caption text-ink-soft">
                <b className="font-semibold text-ink">[Prénom Nom]</b>
                <span>[Curateur, institution]</span>
              </span>
            </figcaption>
          </Reveal>
          <Reveal as="figure" delay={0.12} className="border border-line bg-surface p-8">
            <blockquote className="font-display text-lead leading-[1.4] text-ink">
              « [Citation du curateur, à fournir et valider avec lui.] »
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-4">
              <span
                aria-hidden="true"
                className="flex size-12 shrink-0 items-center justify-center border border-line font-display text-ink"
              >
                ··
              </span>
              <span className="flex flex-col text-caption text-ink-soft">
                <b className="font-semibold text-ink">[Prénom Nom]</b>
                <span>[Curateur, institution]</span>
              </span>
            </figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
