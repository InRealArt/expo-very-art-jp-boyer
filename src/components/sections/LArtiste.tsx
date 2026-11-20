import Image from "next/image";

export default function LArtiste() {
  return (
    <section id="artiste" className="bg-paper py-24 lg:py-36">
      <div className="mx-auto grid max-w-(--container-site) gap-10 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <figure>
            <Image
              src="/images/jean-paul-boyer-portrait.webp"
              width={880}
              height={1330}
              loading="lazy"
              alt="Portrait de Jean-Paul Boyer devant l’une de ses sculptures en verre"
              className="h-auto w-full"
            />
          </figure>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="overline">L’artiste</p>
          <h2 className="mt-4 font-display text-h2 font-normal leading-[1.1] tracking-[-0.01em] text-ink">
            Jean-Paul Boyer
          </h2>
          <div className="mt-6 space-y-6 text-[1.0625rem] leading-[1.65] text-ink-text">
            <p className="max-w-[65ch]">
              Né en France en 1942, Jean-Paul Boyer commence par une production classique, essentiellement en bois. Il élargit ensuite sa pratique à tous les matériaux : marbre, pierre, bronze, acier, verre, résines, et jusqu’aux objets du quotidien.
            </p>
            <p className="max-w-[65ch]">
              Dans chacune de ses pièces, l’air et le vide font partie de l’œuvre. Depuis son atelier d’Épinay-sur-Orge, il a réalisé près d’un millier de sculptures, presque toutes uniques, exposées en galeries et salons en France et à l’international.
            </p>
          </div>
          <ul className="mt-10 border-t border-line">
            <li className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:items-baseline sm:gap-6">
              <b className="font-display text-lead font-normal text-accent sm:w-28 sm:shrink-0">1942</b>
              <span className="text-ink-text">Naissance en France</span>
            </li>
            <li className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:items-baseline sm:gap-6">
              <b className="font-display text-lead font-normal text-accent sm:w-28 sm:shrink-0">Débuts</b>
              <span className="text-ink-text">Production classique, essentiellement en bois</span>
            </li>
            <li className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:items-baseline sm:gap-6">
              <b className="font-display text-lead font-normal text-accent sm:w-28 sm:shrink-0">Atelier</b>
              <span className="text-ink-text">Épinay-sur-Orge, près d’un millier de sculptures</span>
            </li>
            <li className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:items-baseline sm:gap-6">
              <b className="font-display text-lead font-normal text-accent sm:w-28 sm:shrink-0">2026</b>
              <span className="text-ink-text">Exposition à la Very Art Gallery, Paris 3e</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
