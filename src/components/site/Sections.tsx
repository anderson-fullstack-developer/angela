import { useState, type FormEvent } from "react";
import {
  ArrowRight, Building2, CalendarCheck, Camera, Check, ClipboardList, Facebook, HardHat, Home, HeartHandshake,
  MapPin, MessageCircle, Phone, Play, Quote, Video as VideoIcon, Smartphone, Sofa, Sparkles, Star, Warehouse, Search, Briefcase, Send, ShieldCheck, Award, Crown, Clock, Heart, Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal, SectionHeading } from "./Reveal";
import { NAV } from "./Header";
import logoUrl from "@/assets/cleandireto-logo.webp";
import { cn } from "@/lib/utils";
import heroImg from "@/assets/hero-interior.jpg";
import officeImg from "@/assets/office-clean.jpg";
import {
  DEFAULT_WA_MESSAGE, FACEBOOK_URL, PHONE_DISPLAY, PHONE_TEL, SHEET_URL, URGENCY_OPTIONS, buildQuoteMessage, saveQuoteToSheet, whatsappLink, type QuoteData,
} from "@/lib/contact";

const Container = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("mx-auto max-w-7xl px-5 sm:px-8", className)}>{children}</div>
);

/* ---------------- HERO ---------------- */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-soft pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 size-[38rem] rounded-full bg-sky/70 blur-3xl" />
      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary shadow-soft">
            <MapPin className="size-3.5" /> Coimbra e arredores
          </span>
          <h1 className="mt-7 text-4xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-5xl lg:text-[3.6rem] text-balance">
            Espaços impecáveis, <span className="font-serif font-normal italic text-gradient-brand">com cuidado em cada detalhe.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Na CleanDireto, cuidamos da limpeza de casas, empresas e espaços comerciais com atenção a cada detalhe.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl"><a href="#orcamento">Pedir Orçamento Gratuito <ArrowRight /></a></Button>
            <Button asChild variant="whatsapp" size="xl">
              <a href={whatsappLink(DEFAULT_WA_MESSAGE)} target="_blank" rel="noopener noreferrer"><MessageCircle /> Falar no WhatsApp</a>
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-navy/80">
            {["Casas", "Empresas", "Condomínios", "Pós-obra"].map((t) => (
              <li key={t} className="flex items-center gap-2"><Check className="size-4 text-bright" /> {t}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={150} className="relative">
          <div className="relative overflow-hidden rounded-[2rem] shadow-elegant">
            <img src={heroImg} alt="Sala de estar luminosa e impecavelmente limpa" width={1536} height={1152} className="aspect-[4/3.4] w-full object-cover" fetchPriority="high" />
          </div>
          <div className="glass absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl border border-border/60 p-4 shadow-soft sm:-left-8">
            <span className="grid size-11 place-items-center rounded-xl bg-gradient-brand text-primary-foreground"><Sparkles className="size-5" /></span>
            <span>
              <span className="block text-sm font-extrabold text-navy">Orçamento sem compromisso</span>
              <span className="block text-xs text-muted-foreground">Diga-nos do que precisa</span>
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------------- TRUST STRIP ---------------- */
const TRUST = [
  { icon: ShieldCheck, title: "Orçamento gratuito", text: "Sem compromisso" },
  { icon: MessageCircle, title: "Resposta por WhatsApp", text: "Contacto direto e rápido" },
  { icon: MapPin, title: "Coimbra e arredores", text: "Vamos até si" },
  { icon: Building2, title: "Particulares e empresas", text: "Casas, escritórios e condomínios" },
];
export function TrustStrip() {
  return (
    <section aria-label="Vantagens" className="border-y border-border bg-card">
      <Container className="grid grid-cols-2 gap-x-4 gap-y-6 py-8 lg:grid-cols-4 lg:py-10">
        {TRUST.map((t) => (
          <div key={t.title} className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><t.icon className="size-5" /></span>
            <span className="min-w-0">
              <span className="block text-sm font-extrabold leading-tight text-navy sm:text-base">{t.title}</span>
              <span className="block text-xs text-muted-foreground sm:text-sm">{t.text}</span>
            </span>
          </div>
        ))}
      </Container>
    </section>
  );
}

/* ---------------- NÚMEROS (dados indicados e autorizados pelo cliente, 15/11/2026) ---------------- */
const STATS = [
  { icon: Sparkles, value: "1000+", label: "Espaços tratados" },
  { icon: Heart, value: "98%", label: "Satisfação estimada" },
  { icon: Clock, value: "10h", label: "Resposta média" },
  { icon: Layers, value: "6", label: "Tipos de serviço" },
  { icon: MapPin, value: "10+", label: "Zonas de atuação" },
];
export function Stats() {
  return (
    <section aria-label="Números da CleanDireto" className="bg-card pt-12 sm:pt-16">
      <Container>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-5">
          {STATS.map((st, i) => (
            <Reveal key={st.label} delay={i * 60} className={cn(i === STATS.length - 1 && "col-span-2 lg:col-span-1")}>
              <div className="h-full rounded-3xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-elegant sm:p-6">
                <span className="grid size-11 place-items-center rounded-2xl bg-secondary text-primary"><st.icon className="size-5" /></span>
                <p className="mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{st.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{st.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------------- PERCURSO (pedido do cliente) ---------------- */
// Anos indicados pelo Nuno. Se a data de início da atividade mudar, alterar aqui.
const JOURNEY = [
  { icon: Award, year: "2023", text: "Compromisso desde o início." },
  { icon: ShieldCheck, year: "2024", text: "Consolidação da confiança local." },
  { icon: Crown, year: "2025", text: "Padrão de rigor reforçado." },
];
export function Journey() {
  return (
    <section aria-label="O nosso percurso" className="bg-card py-14 sm:py-20">
      <Container>
        <Reveal><p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base">Compromisso com a qualidade, o rigor e a confiança no serviço prestado.</p></Reveal>
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-3 sm:gap-6">
          {JOURNEY.map((j, i) => (
            <Reveal key={j.year} delay={i * 80}>
              <div className="h-full rounded-[2rem] bg-gradient-to-br from-sky/60 to-card px-6 py-8 text-center shadow-soft">
                <span className="relative mx-auto grid size-24 place-items-center rounded-full bg-card text-primary shadow-elegant">
                  <span aria-hidden className="absolute inset-2 rounded-full border-2 border-dashed border-sky" />
                  <j.icon className="relative size-9" />
                </span>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-primary">Compromisso com a qualidade</p>
                <p className="mt-1 text-4xl font-extrabold text-navy">{j.year}</p>
                <p className="mt-2 text-sm text-muted-foreground">{j.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------------- SERVICES ---------------- */
const SERVICES = [
  { icon: Home, title: "Limpeza Doméstica", text: "Limpezas de habitações para manter o ambiente limpo, agradável e confortável." },
  { icon: HardHat, title: "Limpeza Pós-Obra", text: "Remoção de pó e sujidade após obras ou remodelações, preparando os espaços para utilização." },
  { icon: Briefcase, title: "Escritórios e Empresas", text: "Limpeza de espaços profissionais, com soluções adaptadas às necessidades de cada empresa." },
  { icon: Building2, title: "Condomínios e Edifícios", text: "Limpeza de entradas, escadas e espaços comuns." },
  { icon: Sofa, title: "Sofás e Carpetes", text: "Limpeza de sofás e carpetes. Contacte-nos para confirmar disponibilidade para o seu caso." },
  { icon: Warehouse, title: "Limpeza de Telhados", text: "Limpeza de telhados. Fale connosco para avaliarmos o seu caso e confirmarmos disponibilidade." },
];

export function Services() {
  return (
    <section id="servicos" className="py-16 sm:py-24 lg:py-32">
      <Container>
        <SectionHeading eyebrow="Serviços" title="Uma solução para cada espaço." subtitle="Da sua casa ao escritório, do condomínio ao espaço acabado de remodelar." />
        <div className="mt-10 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <article className="group flex h-full flex-col rounded-3xl border border-border bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant sm:p-7">
                <span className="grid size-14 place-items-center rounded-2xl bg-secondary text-primary transition-colors group-hover:bg-gradient-brand group-hover:text-primary-foreground">
                  <s.icon className="size-6" />
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-navy sm:mt-6 sm:text-xl">{s.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{s.text}</p>
                <a href={whatsappLink(`Olá CleanDireto! Gostaria de pedir um orçamento para: ${s.title}.`)} target="_blank" rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-10 items-center gap-2 self-start text-sm font-bold text-primary sm:mt-6">
                  Pedir orçamento <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------------- BEFORE / AFTER ---------------- */
type Comparison = { before: string; after: string; label: string };
// Adicionar apenas fotografias reais de trabalhos da CleanDireto, com autorização.
const GALLERY: Record<string, Comparison[]> = {
  "Domésticas": [], "Pós-obra": [], "Sofás e carpetes": [], "Escritórios": [], "Condomínios": [],
};

function BeforeAfter({ c }: { c: Comparison }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-elegant select-none">
      <img src={c.after} alt={`Depois — ${c.label}`} className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={c.before} alt={`Antes — ${c.label}`} className="absolute inset-0 size-full object-cover" />
      </div>
      <div className="absolute inset-y-0 w-0.5 bg-card" style={{ left: `${pos}%` }} />
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(+e.target.value)} aria-label="Comparar antes e depois" className="absolute inset-0 size-full cursor-ew-resize opacity-0" />
    </div>
  );
}

export function Gallery() {
  // Sem fotografias reais ainda: a secção não aparece (evita quadros vazios na demonstração).
  if (!Object.values(GALLERY).some((list) => list.length)) return null;
  return <GalleryContent />;
}

function GalleryContent() {
  const cats = Object.keys(GALLERY).filter((c) => (GALLERY[c] ?? []).length);
  const [cat, setCat] = useState<string>(cats[0] ?? "");
  const items: Comparison[] = GALLERY[cat] ?? [];
  return (
    <section id="antes-depois" className="bg-muted py-16 sm:py-24 lg:py-32">
      <Container>
        <SectionHeading eyebrow="Antes & Depois" title="Resultados que fazem a diferença." subtitle="Compare o antes e o depois dos nossos trabalhos, deslizando o controlo sobre cada fotografia." />
        <Reveal className="mt-12 flex flex-wrap justify-center gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={cn("rounded-full px-5 py-2.5 text-sm font-bold transition-all", c === cat ? "bg-navy text-navy-foreground shadow-soft" : "bg-card text-navy/70 hover:text-primary")}>
              {c}
            </button>
          ))}
        </Reveal>
        <Reveal className="mx-auto mt-10 max-w-4xl">
          {items.length ? (
            <div className="grid gap-6">{items.map((c) => <BeforeAfter key={c.label} c={c} />)}</div>
          ) : (
            <div className="grid aspect-[16/9] place-items-center rounded-3xl border-2 border-dashed border-primary/25 bg-card p-8 text-center">
              <div>
                <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-secondary text-primary"><Camera className="size-7" /></span>
                <p className="mt-5 text-lg font-extrabold text-navy">Fotografias reais em breve</p>
                <p className="mx-auto mt-2 max-w-md text-muted-foreground">Esta galeria vai mostrar trabalhos verdadeiros da CleanDireto na categoria «{cat}».</p>
              </div>
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
export function About() {
  const values = ["Atenção ao detalhe", "Confiança", "Organização", "Proximidade", "Compromisso com o cliente"];
  return (
    <section id="sobre" className="py-16 sm:py-24 lg:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative">
          <img src={officeImg} alt="Escritório moderno e impecavelmente limpo" width={1280} height={1280} loading="lazy" className="aspect-square w-full rounded-[2rem] object-cover shadow-elegant" />
          <div aria-hidden className="absolute -right-4 -bottom-4 -z-10 size-full rounded-[2rem] bg-sky" />
        </Reveal>
        <div>
          <SectionHeading center={false} eyebrow="Sobre a CleanDireto" title="Profissionalismo e dedicação em cada limpeza." />
          <Reveal delay={100}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              A CleanDireto é uma empresa de serviços de limpeza com atividade na região de Coimbra. O nosso objetivo é ajudar particulares e empresas a manter os seus espaços limpos, cuidados e agradáveis.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {values.map((v) => (
                <li key={v} className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-bold text-navy shadow-soft">
                  <span className="size-1.5 rounded-full bg-bright" /> {v}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- WHY ---------------- */
const WHY = [
  { icon: HeartHandshake, title: "Atendimento próximo", text: "Compreendemos as necessidades de cada cliente." },
  { icon: ClipboardList, title: "Serviços personalizados", text: "Procuramos soluções adequadas a diferentes espaços." },
  { icon: Search, title: "Atenção ao detalhe", text: "Valorizamos um trabalho cuidado e bem executado." },
  { icon: ShieldCheck, title: "Orçamento sem compromisso", text: "Entre em contacto e explique o serviço de que necessita." },
];
export function Why() {
  return (
    <section id="porque" className="relative overflow-hidden bg-navy py-24 text-navy-foreground lg:py-32">
      <div aria-hidden className="absolute -top-32 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-bright/25 blur-3xl" />
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky">A nossa diferença</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">Porquê escolher a <span className="font-serif font-normal italic">CleanDireto?</span></h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-5 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 80}>
              <div className="h-full rounded-3xl border border-navy-foreground/10 bg-navy-foreground/5 p-4 text-center backdrop-blur transition-colors hover:bg-navy-foreground/10 sm:p-7">
                <span className="relative mx-auto grid size-16 place-items-center rounded-full bg-card text-primary shadow-elegant sm:size-20">
                  <span aria-hidden className="absolute inset-1.5 rounded-full border-2 border-dashed border-sky/60" />
                  <w.icon className="relative size-6 sm:size-8" />
                </span>
                <h3 className="mt-4 text-sm font-extrabold uppercase leading-snug tracking-[0.12em] text-sky sm:mt-6 sm:text-base">{w.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-foreground/70 sm:mt-2 sm:text-base">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------------- PROCESS ---------------- */
const STEPS = [
  { icon: MessageCircle, title: "Entre em contacto", text: "Explique o serviço de limpeza de que necessita." },
  { icon: ClipboardList, title: "Peça um orçamento", text: "Avaliamos as necessidades e apresentamos uma proposta." },
  { icon: CalendarCheck, title: "Combine o serviço", text: "Defina a data e os detalhes diretamente com a equipa." },
  { icon: Sparkles, title: "Desfrute do seu espaço", text: "A CleanDireto realiza o serviço combinado." },
];
export function Process() {
  return (
    <section id="processo" className="py-16 sm:py-24 lg:py-32">
      <Container>
        <SectionHeading eyebrow="Como funciona" title="Simples, do primeiro contacto ao espaço limpo." />
        <ol className="relative mt-10 grid gap-5 sm:mt-16 md:grid-cols-4 md:gap-6">
          <div aria-hidden className="absolute top-8 right-[12%] left-[12%] hidden h-px bg-border md:block" />
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <li className="relative flex items-start gap-4 md:block md:text-center">
                <span className="relative grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-elegant md:mx-auto md:size-16"><s.icon className="size-5 md:size-6" /></span>
                <div>
                  <p className="font-serif text-2xl leading-none italic text-bright md:mt-6 md:text-3xl">0{i + 1}</p>
                  <h3 className="mt-1 text-base font-extrabold text-navy md:text-lg">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground md:mx-auto md:mt-2 md:max-w-xs md:text-base">{s.text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* ---------------- VIDEO ---------------- */
// Vídeo real enviado pelo cliente (limpeza de bolores). Vertical, H.264, só carrega quando se carrega em Play.
const VIDEO = { src: "/videos/limpeza-bolores.mp4", poster: "/videos/limpeza-bolores-poster.jpg", title: "Limpeza de bolores" };
export function Video() {
  return (
    <section id="video" className="bg-muted py-16 sm:py-24 lg:py-32">
      <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <SectionHeading center={false} eyebrow="Trabalho real" title="Veja a diferença em vídeo." subtitle="Um trabalho real da CleanDireto: limpeza de bolores num quarto, do teto às paredes." />
          <Reveal delay={100}>
            <ul className="mt-8 grid gap-3">
              {["Remoção de bolores e manchas de humidade", "Tetos, paredes e cantos difíceis", "Produtos adequados a cada superfície"].map((t) => (
                <li key={t} className="flex items-center gap-3 font-semibold text-navy"><Check className="size-5 shrink-0 text-bright" /> {t}</li>
              ))}
            </ul>
            <Button asChild variant="hero" size="xl" className="mt-8">
              <a href={whatsappLink("Olá CleanDireto! Gostaria de pedir um orçamento para limpeza de bolores.")} target="_blank" rel="noopener noreferrer"><MessageCircle /> Pedir orçamento para bolores</a>
            </Button>
          </Reveal>
        </div>
        <Reveal delay={150} className="mx-auto w-full max-w-[340px]">
          <div className="rounded-[2.4rem] bg-navy p-2.5 shadow-elegant">
            <video controls playsInline preload="none" poster={VIDEO.poster} className="block aspect-[9/16] w-full rounded-[1.9rem] bg-navy object-cover" aria-label={`Vídeo: ${VIDEO.title}`}>
              <source src={VIDEO.src} type="video/mp4" />
              O seu navegador não consegue reproduzir este vídeo.
            </video>
          </div>
          <p className="mt-3 text-center text-sm text-muted-foreground">{VIDEO.title} · trabalho real da CleanDireto</p>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------------- ZONES ---------------- */
const ZONES = ["Coimbra", "Condeixa-a-Nova", "Lousã"];
export function Zones() {
  return (
    <section id="zonas" className="py-16 sm:py-24 lg:py-32">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-14">
        <div>
          <SectionHeading center={false} eyebrow="Zonas de atuação" title="Coimbra e arredores." subtitle="Estamos perto de si para limpezas em casas, empresas e condomínios." />
          <Reveal delay={100}>
            <ul className="mt-8 flex flex-wrap gap-3">
              {ZONES.map((z) => (
                <li key={z} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 font-bold text-navy shadow-soft">
                  <MapPin className="size-4 text-bright" /> {z}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-3xl bg-secondary p-6">
              <p className="font-semibold text-navy">Não encontra a sua localidade? Fale connosco para confirmar disponibilidade.</p>
              <Button asChild variant="whatsapp" size="lg" className="mt-5">
                <a href={whatsappLink("Olá CleanDireto! Gostaria de confirmar se trabalham na minha localidade: ")} target="_blank" rel="noopener noreferrer"><MessageCircle /> Perguntar no WhatsApp</a>
              </Button>
            </div>
          </Reveal>
        </div>
        <Reveal delay={150}>
          <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
            <iframe src="https://maps.google.com/maps?ll=40.17,-8.38&z=10&output=embed" title="Mapa de Coimbra e arredores" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" className="block aspect-[4/3] w-full border-0" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------------- QUOTE ---------------- */
const field = "w-full rounded-xl border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10";
export function QuoteSection() {
  const [d, setD] = useState<QuoteData>({ nome: "", contacto: "", email: "", localidade: "", tipo: "Limpeza Doméstica", urgencia: URGENCY_OPTIONS[0], descricao: "" });
  const set = (k: keyof typeof d) => (e: { target: { value: string } }) => setD({ ...d, [k]: e.target.value });
  const submit = (e: FormEvent) => {
    e.preventDefault();
    saveQuoteToSheet(d, "WhatsApp");
    const url = whatsappLink(buildQuoteMessage(d));
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url;
  };
  const sendSms = (e: { currentTarget: HTMLButtonElement }) => {
    const form = e.currentTarget.form;
    if (form && !form.reportValidity()) return;
    saveQuoteToSheet(d, "SMS");
    window.location.href = `sms:${PHONE_TEL.replace("tel:", "")}?body=${encodeURIComponent(buildQuoteMessage(d))}`;
  };
  return (
    <section id="orcamento" className="bg-gradient-soft py-16 sm:py-24 lg:py-32">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <SectionHeading center={false} eyebrow="Pedir orçamento" title="O seu espaço merece o melhor cuidado." subtitle="Conte-nos o que precisa e solicite o seu orçamento sem compromisso." />
          <Reveal delay={100} className="mt-10 grid gap-3">
            {[
              { href: whatsappLink(DEFAULT_WA_MESSAGE), icon: MessageCircle, label: "WhatsApp", value: PHONE_DISPLAY, ext: true },
              { href: PHONE_TEL, icon: Phone, label: "Telefone", value: PHONE_DISPLAY },
              { href: FACEBOOK_URL, icon: Facebook, label: "Facebook", value: "CleanDireto", ext: true },
            ].map((c) => (
              <a key={c.label} href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/40">
                <span className="grid size-12 place-items-center rounded-xl bg-secondary text-primary"><c.icon className="size-5" /></span>
                <span className="flex-1">
                  <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">{c.label}</span>
                  <span className="block font-extrabold text-navy">{c.value}</span>
                </span>
                <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </Reveal>
        </div>
        <Reveal delay={150}>
          <form onSubmit={submit} className="rounded-[2rem] border border-border bg-card p-6 shadow-elegant sm:p-9">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-navy">Nome<input required maxLength={80} value={d.nome} onChange={set("nome")} className={field} placeholder="O seu nome" autoComplete="name" /></label>
              <label className="grid gap-2 text-sm font-bold text-navy">Telefone<input required type="tel" inputMode="tel" maxLength={30} value={d.contacto} onChange={set("contacto")} className={field} placeholder="O seu número" autoComplete="tel" /></label>
              <label className="grid gap-2 text-sm font-bold text-navy sm:col-span-2">Email <span className="-mt-1 text-xs font-medium text-muted-foreground">Opcional</span><input type="email" maxLength={100} value={d.email} onChange={set("email")} className={field} placeholder="exemplo@email.com" autoComplete="email" /></label>
              <label className="grid gap-2 text-sm font-bold text-navy">Localidade<input required maxLength={60} value={d.localidade} onChange={set("localidade")} className={field} placeholder="Ex.: Coimbra" /></label>
              <label className="grid gap-2 text-sm font-bold text-navy">Tipo de limpeza
                <select value={d.tipo} onChange={set("tipo")} className={field}>
                  {SERVICES.map((s) => <option key={s.title}>{s.title}</option>)}
                  <option>Outro</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-navy sm:col-span-2">Nível de urgência
                <select value={d.urgencia} onChange={set("urgencia")} className={field}>
                  {URGENCY_OPTIONS.map((u) => <option key={u}>{u}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-navy sm:col-span-2">Descrição do serviço<textarea rows={4} maxLength={800} value={d.descricao} onChange={set("descricao")} className={field} placeholder="Tipologia, área aproximada, datas preferidas…" /></label>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Button type="submit" variant="hero" size="xl" className="w-full"><Send /> Enviar por WhatsApp</Button>
              <Button type="button" variant="soft" size="xl" className="w-full" onClick={sendSms}><Smartphone /> Enviar por SMS</Button>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Ao enviar, abre-se o WhatsApp ou as mensagens do telemóvel com o pedido já escrito. {SHEET_URL ? "Os dados do pedido ficam também registados pela CleanDireto para dar seguimento ao orçamento." : "Este website não guarda os seus dados."} São usados apenas pela CleanDireto para responder ao seu pedido.
            </p>
          </form>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
type Testimonial = { name: string; place: string; text: string };
// Adicionar apenas avaliações verdadeiras, com autorização dos clientes.
const TESTIMONIALS: Testimonial[] = [];
export function Testimonials() {
  // Só aparecem avaliações verdadeiras; enquanto a lista estiver vazia, a secção fica escondida.
  if (!TESTIMONIALS.length) return null;
  return (
    <section id="testemunhos" className="py-16 sm:py-24 lg:py-32">
      <Container>
        <SectionHeading eyebrow="Testemunhos" title="A opinião de quem nos conhece." />
        {TESTIMONIALS.length ? (
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Reveal key={t.name}><figure className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft">
                <Quote className="size-7 text-bright" /><blockquote className="mt-4 leading-relaxed text-navy">{t.text}</blockquote>
                <figcaption className="mt-5 text-sm font-bold text-navy">{t.name} <span className="font-medium text-muted-foreground">· {t.place}</span></figcaption>
              </figure></Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mx-auto mt-12 max-w-2xl rounded-3xl border border-border bg-card p-10 text-center shadow-soft">
            <Star className="mx-auto size-8 text-bright" />
            <p className="mt-4 text-lg font-extrabold text-navy">As primeiras avaliações chegam em breve.</p>
            <p className="mt-2 text-muted-foreground">Já trabalhou connosco? Partilhe a sua experiência na nossa página de Facebook.</p>
            <Button asChild variant="soft" size="lg" className="mt-6"><a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"><Facebook /> Visitar Facebook</a></Button>
          </Reveal>
        )}
      </Container>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
const FAQ = [
  { q: "O orçamento é gratuito?", a: "Sim. Pode pedir um orçamento sem compromisso, explicando o serviço de que necessita." },
  { q: "Em quanto tempo respondem?", a: "O tempo médio de resposta é de 10 horas. Para pedidos urgentes, indique a urgência no formulário ou contacte-nos diretamente por WhatsApp ou telefone." },
  { q: "Fazem limpezas pós-obra?", a: "Sim, a limpeza pós-obra é um dos serviços da CleanDireto. Descreva o espaço e o tipo de obra para avaliarmos o seu caso." },
  { q: "Trabalham fora de Coimbra?", a: "Atuamos em Coimbra e arredores, incluindo Condeixa-a-Nova e Lousã. Se a sua localidade não estiver indicada, contacte-nos para confirmar disponibilidade." },
  { q: "Fazem limpezas regulares?", a: "Fale connosco sobre a frequência que pretende; avaliamos a possibilidade de acordo com o seu espaço e as suas necessidades." },
  { q: "Como posso pedir um orçamento?", a: "Pelo formulário desta página, por WhatsApp, por telefone ou através da nossa página de Facebook." },
  { q: "Como são combinadas as datas dos serviços?", a: "Depois de aceitar a proposta, a data e os detalhes são combinados diretamente consigo." },
];
export function Faq() {
  return (
    <section id="faq" className="bg-muted py-16 sm:py-24 lg:py-32">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="Perguntas frequentes" title="Tem dúvidas? Nós ajudamos." />
        <Reveal className="mt-12">
          <Accordion type="single" collapsible className="grid gap-3">
            {FAQ.map((f, i) => (
              <AccordionItem key={f.q} value={`i${i}`} className="rounded-2xl border border-border bg-card px-6 shadow-soft">
                <AccordionTrigger className="py-5 text-left text-base font-extrabold text-navy hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
export function FinalCta() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-navy px-6 py-12 text-center text-navy-foreground shadow-elegant sm:px-12 sm:py-16">
        <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 size-[32rem] -translate-x-1/2 rounded-full bg-bright/30 blur-3xl" />
        <div className="relative">
          <h2 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            O seu espaço impecável, <span className="font-serif font-normal italic">sem complicações.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-foreground/75 sm:text-lg">Fale connosco e receba um orçamento sem compromisso.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="whatsapp" size="xl"><a href={whatsappLink(DEFAULT_WA_MESSAGE)} target="_blank" rel="noopener noreferrer"><MessageCircle /> Falar no WhatsApp</a></Button>
            <Button asChild variant="soft" size="xl"><a href={PHONE_TEL}><Phone /> Ligar {PHONE_DISPLAY}</a></Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
export function Footer() {
  return (
    <footer className="bg-navy pt-14 pb-28 text-navy-foreground sm:pt-20 lg:pb-10">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div className="col-span-2 lg:col-span-1">
            <a href="#top" aria-label="CleanDireto — início" className="inline-block rounded-2xl bg-white p-3 shadow-soft">
              <img src={logoUrl} alt="CleanDireto Limpezas" width={160} height={113} loading="lazy" className="h-auto w-36" />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-foreground/65 sm:text-base">Limpezas profissionais para casas, empresas e condomínios em Coimbra e arredores.</p>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="CleanDireto no Facebook"
              className="mt-5 inline-grid size-11 place-items-center rounded-full bg-navy-foreground/10 transition-colors hover:bg-[#1877F2]"><Facebook className="size-5" /></a>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky">Serviços</p>
            <ul className="mt-4 grid gap-1 text-sm">
              {SERVICES.map((sv) => <li key={sv.title}><a href="#servicos" className="inline-flex min-h-9 items-center text-navy-foreground/75 hover:text-navy-foreground">{sv.title}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky">Zonas</p>
            <ul className="mt-4 grid gap-1 text-sm text-navy-foreground/75">
              {ZONES.map((z) => <li key={z} className="flex min-h-9 items-center">{z}</li>)}
              <li className="flex min-h-9 items-center"><a href="#zonas" className="inline-flex min-h-9 items-center hover:text-navy-foreground">e arredores →</a></li>
            </ul>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky">Contactos</p>
            <ul className="mt-4 grid gap-1 text-sm text-navy-foreground/75">
              <li><a href={PHONE_TEL} className="inline-flex min-h-9 items-center gap-2 hover:text-navy-foreground"><Phone className="size-4" /> {PHONE_DISPLAY}</a></li>
              <li><a href={whatsappLink(DEFAULT_WA_MESSAGE)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-2 hover:text-navy-foreground"><MessageCircle className="size-4" /> WhatsApp</a></li>
              <li><a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-2 hover:text-navy-foreground"><Facebook className="size-4" /> Facebook</a></li>
              <li className="flex min-h-9 items-center gap-2"><MapPin className="size-4" /> Coimbra, Portugal</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-2 border-t border-navy-foreground/10 pt-6 text-sm text-navy-foreground/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} CleanDireto. Todos os direitos reservados.</p>
          <p>Desenvolvido por <span className="font-semibold text-navy-foreground/80">Anderson Neto</span></p>
        </div>
      </Container>
    </footer>
  );
}

export function WhatsAppFab() {
  return (
    <a href={whatsappLink(DEFAULT_WA_MESSAGE)} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp"
      className="fixed right-5 bottom-5 z-40 grid size-15 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-elegant transition-transform hover:scale-110">
      <svg viewBox="0 0 24 24" className="size-7" fill="currentColor" aria-hidden><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-.9 1.2-.3.2-.6.1a8 8 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.4 13.4 0 0 0 5.2 4.6c1.9.8 2.7.9 3.6.7a3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.2-.3-.3-.6-.4zM12 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zm8.4-18.3A11.8 11.8 0 0 0 1.7 17.7L0 24l6.4-1.7a11.8 11.8 0 0 0 5.6 1.4A11.9 11.9 0 0 0 20.4 3.5z"/></svg>
    </a>
  );
}
