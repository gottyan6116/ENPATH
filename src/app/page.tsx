import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import {
  PainPoints,
  Goals,
  Support,
  Comparison,
  Process,
} from "@/components/StorySections";
import { Approach } from "@/components/Approach";
import { Roadmap } from "@/components/Roadmap";
import { Coach, Pricing, FAQ, Consultation } from "@/components/TrustSections";
import { Footer } from "@/components/Footer";
import { ServiceObserver } from "@/components/ServiceObserver";
import { ScrollExperience } from "@/components/ScrollExperience";
import { siteUrl } from "@/lib/config";
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        本文へスキップ
      </a>
      <div id="top" />
      <Header />
      <main id="main">
        <Hero />
        <PainPoints />
        <Goals />
        <Approach />
        <Roadmap />
        <Support />
        <Comparison />
        <Process />
        <Coach />
        <Pricing />
        <FAQ />
        <Consultation />
      </main>
      <Footer />
      <ServiceObserver />
      <ScrollExperience />
      {siteUrl && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ENPATH",
              url: siteUrl,
              logo: new URL("/logo.png", siteUrl).href,
              description:
                "一人ひとりの目標に合わせた学習計画と継続支援を提供する英語コーチングサービス。",
            }).replace(/</g, "\\u003c"),
          }}
        />
      )}
    </>
  );
}
