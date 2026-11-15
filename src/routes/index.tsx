import { createFileRoute } from "@tanstack/react-router";
import { DemoLocked } from "@/components/DemoLocked";

// Demonstração desativada até o cliente ativar o website. Mudar para false para voltar a mostrar o site.
const DEMO_LOCKED = false;
import { Header } from "@/components/site/Header";
import {
  About, FAQ, Faq, FinalCta, Footer, Gallery, Hero, Process, SERVICES, Stats, QuoteSection, Services, Testimonials, VIDEO, Video, WhatsAppFab, Zones,
} from "@/components/site/Sections";

const SITE_URL = "https://cleandireto.vercel.app"; // endereço grátis; mudar quando houver cleandireto.com
const TITLE = "CleanDireto | Limpezas Profissionais em Coimbra";
const DESC =
  "Limpeza doméstica, pós-obra, bolores, escritórios e condomínios em Coimbra e arredores. Peça o seu orçamento sem compromisso por WhatsApp.";
const SHARE_TITLE = "CleanDireto | Limpezas em Coimbra e arredores";
const SHARE_DESC = "Casas, escritórios, condomínios, pós-obra e bolores. Orçamento gratuito por WhatsApp.";

const BUSINESS_ID = `${SITE_URL}/#empresa`;
const localBusiness = {
  "@type": "LocalBusiness",
  "@id": BUSINESS_ID,
  name: "CleanDireto",
  alternateName: "CleanDireto Limpezas",
  description: DESC,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/og-cleandireto-v2.jpg`,
  logo: `${SITE_URL}/favicon-512x512.png`,
  telephone: "+351932929914",
  areaServed: [{ "@type": "City", name: "Coimbra" }, { "@type": "City", name: "Condeixa-a-Nova" }, { "@type": "City", name: "Lousã" }],
  address: { "@type": "PostalAddress", addressLocality: "Coimbra", addressRegion: "Coimbra", addressCountry: "PT" },
  sameAs: ["https://www.facebook.com/share/1E9kHucCe5/"],
  knowsAbout: ["Limpeza doméstica", "Limpeza pós-obra", "Remoção de bolores", "Limpeza de escritórios", "Limpeza de condomínios", "Limpeza de sofás e carpetes", "Limpeza de telhados"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços de limpeza",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.text, areaServed: "Coimbra e arredores", provider: { "@id": BUSINESS_ID } },
    })),
  },
};
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": `${SITE_URL}/#site`, url: `${SITE_URL}/`, name: "CleanDireto", inLanguage: "pt-PT", publisher: { "@id": BUSINESS_ID } },
    localBusiness,
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@type": "VideoObject",
      "@id": `${SITE_URL}/#video`,
      name: "Limpeza de bolores num quarto e numa casa de banho | CleanDireto",
      description: "Trabalho real da CleanDireto: remoção de bolores no teto e nas paredes, antes e depois.",
      thumbnailUrl: [`${SITE_URL}${VIDEO.poster}`],
      contentUrl: `${SITE_URL}${VIDEO.src}`,
      uploadDate: "2026-11-15T12:00:00+00:00",
      duration: "PT19S",
      inLanguage: "pt-PT",
      publisher: { "@id": BUSINESS_ID },
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      // Site aprovado pelo cliente: indexável pelo Google.
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: SHARE_TITLE },
      { property: "og:description", content: SHARE_DESC },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "CleanDireto" },
      { property: "og:locale", content: "pt_PT" },
      { property: "og:url", content: `${SITE_URL}/` },
      // 1200x630 com o conteúdo ao centro: fica inteiro no Facebook e no recorte quadrado do WhatsApp.
      { property: "og:image", content: `${SITE_URL}/og-cleandireto-v2.jpg` },
      { property: "og:image:secure_url", content: `${SITE_URL}/og-cleandireto-v2.jpg` },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "CleanDireto — limpezas profissionais em Coimbra" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SHARE_TITLE },
      { name: "twitter:description", content: SHARE_DESC },
      { name: "twitter:image", content: `${SITE_URL}/og-cleandireto-v2.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(structuredData) }],
  }),
  component: DEMO_LOCKED ? LockedPage : Index,
});

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Gallery />
        <Video />
        <About />
        <Process />
        <Zones />
        <Testimonials />
        <QuoteSection />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}

function LockedPage() {
  return <DemoLocked business="CleanDireto" />;
}
