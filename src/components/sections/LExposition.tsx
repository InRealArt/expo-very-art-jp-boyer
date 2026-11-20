import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
export default function LExposition() {
  return (
    <section id="exposition" className="bg-paper py-24 lg:py-36">
      <div className="mx-auto grid max-w-(--container-site) gap-10 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <p className="eyebrow">L’exposition</p>
          <SplitText
            as="h2"
            text="Sculpter l’air et le vide"
            className="mt-4 font-display text-h2 font-normal leading-[1.1] tracking-[-0.01em] text-ink"
          />
        </div>
        <div className="space-y-6 text-[1.0625rem] leading-[1.65] text-ink-text lg:col-span-6 lg:col-start-7">
          <Reveal className="space-y-6">
          <p className="max-w-[65ch]">
            Né en France en 1942, Jean-Paul Boyer fait de l’air et du vide une partie de la sculpture. Pour cette exposition à la Very Art Gallery, il présente cinq sculptures récentes en acier laqué, de 42 à 100 cm : volutes, éventails et sphères ajourées que la lumière traverse.
          </p>
          <p className="max-w-[65ch]">
            [Deux ou trois phrases sur le propos de l’exposition : ce qui relie les œuvres, ce qu’elle montre de neuf.] L’exposition ouvre le mercredi 2 décembre et se termine le dimanche 6 décembre, avec un vernissage en présence de l’artiste le samedi 5 décembre à 18 h.
          </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-3 sm:gap-0">
            <Reveal delay={0} className="flex flex-col gap-2 sm:pr-6">
              <strong className="font-display text-figure font-normal leading-[1.1] text-ink">5</strong>
              <span className="text-caption text-ink-soft">œuvres exposées</span>
            </Reveal>
            <Reveal delay={0.06} className="flex flex-col gap-2 sm:border-l sm:border-line sm:px-6">
              <strong className="font-display text-figure font-normal leading-[1.1] text-ink">5</strong>
              <span className="text-caption text-ink-soft">jours d’exposition</span>
            </Reveal>
            <Reveal delay={0.12} className="flex flex-col gap-2 sm:border-l sm:border-line sm:pl-6">
              <strong className="whitespace-nowrap font-display text-figure font-normal leading-[1.1] text-ink">≈ 1&nbsp;000</strong>
              <span className="text-caption text-ink-soft">sculptures réalisées</span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
