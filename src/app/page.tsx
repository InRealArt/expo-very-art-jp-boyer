import Acquerir from "@/components/sections/Acquerir";
import Faq from "@/components/sections/Faq";
import Hero from "@/components/sections/Hero";
import Inscription from "@/components/sections/Inscription";
import LArtiste from "@/components/sections/LArtiste";
import LExposition from "@/components/sections/LExposition";
import { Footer, Header, SkipLink } from "@/components/sections/Misc";
import Mosaique from "@/components/sections/Mosaique";
import Regards from "@/components/sections/Regards";
import Visite from "@/components/sections/Visite";

export default function Home() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main" className="pt-20">
        <Hero />
        <LExposition />
        <Mosaique />
        <LArtiste />
        <Regards />
        <Acquerir />
        <Visite />
        <Inscription />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
