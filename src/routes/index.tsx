import { createFileRoute } from "@tanstack/react-router";
import { DemoLocked } from "@/components/DemoLocked";

// Demonstração desativada até o cliente ativar o website. Mudar para false para voltar a mostrar o site.
const DEMO_LOCKED = false;
import { Header } from "@/components/site/Header";
import {
  About, Faq, FinalCta, Footer, Gallery, Hero, Process, Stats, QuoteSection, Services, Testimonials, Video, WhatsAppFab, Zones,
} from "@/components/site/Sections";

const SITE_URL = "https://cleandireto.vercel.app"; // endereço grátis; mudar quando houver cleandireto.com
const TITLE = "CleanDireto | Limpezas Profissionais em Coimbra";
const DESC =
  "Limpeza doméstica, pós-obra, bolores, escritórios e condomínios em Coimbra e arredores. Peça o seu orçamento sem compromisso por WhatsApp.";
const SHARE_TITLE = "CleanDireto | O seu espaço impecável";
const SHARE_DESC = "Limpezas profissionais em Coimbra e arredores. Peça o seu orçamento sem compromisso!";

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#empresa`,
  name: "CleanDireto",
  description: DESC,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/og-share.jpg`,
  logo: `${SITE_URL}/favicon-512x512.png`,
  telephone: "+351932929914",
  areaServed: [{ "@type": "City", name: "Coimbra" }, { "@type": "City", name: "Condeixa-a-Nova" }, { "@type": "City", name: "Lousã" }],
  address: { "@type": "PostalAddress", addressLocality: "Coimbra", addressCountry: "PT" },
  sameAs: ["https://www.facebook.com/share/1E9kHucCe5/"],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      // Demonstração: não indexar até o cliente aprovar (depois mudar para "index, follow").
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: SHARE_TITLE },
      { property: "og:description", content: SHARE_DESC },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "CleanDireto" },
      { property: "og:locale", content: "pt_PT" },
      { property: "og:url", content: `${SITE_URL}/` },
      // 1200x630 com o conteúdo ao centro: fica inteiro no Facebook e no recorte quadrado do WhatsApp.
      { property: "og:image", content: `${SITE_URL}/og-share.jpg` },
      { property: "og:image:secure_url", content: `${SITE_URL}/og-share.jpg` },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "CleanDireto — limpezas profissionais em Coimbra" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SHARE_TITLE },
      { name: "twitter:description", content: SHARE_DESC },
      { name: "twitter:image", content: `${SITE_URL}/og-share.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(localBusiness) }],
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
        <QuoteSection />
        <Testimonials />
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
