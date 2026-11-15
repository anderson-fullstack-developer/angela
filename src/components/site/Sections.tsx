import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight, Building2, CalendarCheck, Camera, Check, ClipboardList, Facebook, HardHat, Home, MapPin, MessageCircle, Phone, Play, Quote, Smartphone, Sofa, Sparkles, Star, Warehouse, Briefcase, Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal, SectionHeading } from "./Reveal";
import { NAV } from "./Header";
import logoUrl from "@/assets/cleandireto-logo.webp";
import { cn } from "@/lib/utils";
import quartoAntes from "@/assets/trabalhos/quarto-antes.webp";
import quartoDepois from "@/assets/trabalhos/quarto-depois.webp";
import wcCantoAntes from "@/assets/trabalhos/casa-de-banho-canto-antes.webp";
import wcCantoDepois from "@/assets/trabalhos/casa-de-banho-canto-depois.webp";
import wcParedeAntes from "@/assets/trabalhos/casa-de-banho-parede-antes.webp";
import wcParedeDepois from "@/assets/trabalhos/casa-de-banho-parede-depois.webp";
import {
  DEFAULT_WA_MESSAGE, FACEBOOK_URL, PHONE_DISPLAY, PHONE_TEL, SHEET_URL, URGENCY_OPTIONS, buildQuoteMessage, saveQuoteToSheet, whatsappLink, type QuoteData,
} from "@/lib/contact";

const Container = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("mx-auto max-w-7xl px-5 sm:px-8", className)}>{children}</div>
);

/* ---------------- HERO ---------------- */
export function Hero() {
  return (
    <section id="top" className="relative bg-gradient-soft pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal>
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            <Sparkles className="size-4" /> Orçamento gratuito · Resposta média de 10 horas
          </p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-[3.4rem] text-balance">
            Limpezas profissionais em Coimbra e arredores.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Casas, escritórios, condomínios, limpezas pós-obra e remoção de bolores. Diga-nos o que precisa e enviamos um orçamento gratuito, em média em 10 horas.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl"><a href="#orcamento">Pedir orçamento gratuito <ArrowRight /></a></Button>
            <Button asChild variant="whatsapp" size="xl">
              <a href={whatsappLink(DEFAULT_WA_MESSAGE)} target="_blank" rel="noopener noreferrer"><MessageCircle /> Falar no WhatsApp</a>
            </Button>
          </div>
          <ul className="mt-8 grid gap-2.5 text-sm font-semibold text-navy/80 sm:flex sm:flex-wrap sm:gap-x-6">
            {["Coimbra, Condeixa-a-Nova e Lousã", "Particulares e empresas", "Datas à sua medida"].map((t) => (
              <li key={t} className="flex items-center gap-2"><Check className="size-4 shrink-0 text-bright" /> {t}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <figure>
            <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-3xl shadow-elegant sm:gap-3">
              {[{ src: quartoAntes, tag: "Antes" }, { src: quartoDepois, tag: "Depois" }].map((p, i) => (
                <div key={p.tag} className="relative">
                  <img src={p.src} alt={`${p.tag} da limpeza de bolores num quarto`} width={720} height={960} className="aspect-[3/4] w-full object-cover" {...(i === 0 ? { fetchPriority: "high" as const } : {})} />
                  <span className={cn("absolute top-3 left-3 rounded-md px-2.5 py-1 text-xs font-bold", i === 0 ? "bg-navy/80 text-white" : "bg-white text-navy")}>{p.tag}</span>
                </div>
              ))}
            </div>
            <figcaption className="mt-3 text-sm text-muted-foreground">Limpeza de bolores num quarto. Fotografias de um trabalho real da CleanDireto.</figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------------- NÚMEROS (dados indicados e autorizados pelo cliente, 15/11/2026) ---------------- */
const STATS = [
  { value: "1000+", label: "Espaços limpos" },
  { value: "98%", label: "Clientes satisfeitos (estimativa)" },
  { value: "10h", label: "Tempo médio de resposta" },
  { value: "6", label: "Tipos de serviço" },
  { value: "10+", label: "Localidades servidas" },
];
// Conta de 0 até ao valor quando a faixa fica visível. O valor real está sempre no HTML
// (texto só para leitores de ecrã e motores de pesquisa); com "reduzir movimento" mostra logo o final.
function CountUp({ value, duration = 2200 }: { value: string; duration?: number }) {
  const m = value.match(/^(\D*)(\d+)(.*)$/);
  const target = m ? Number(m[2]) : 0;
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!m || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(target); return; }
    let raf = 0, timer = 0, started = false;
    const start = (delay: number) => {
      if (started) return;
      started = true;
      io.disconnect();
      timer = window.setTimeout(() => {
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - t0) / duration, 1);
          setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }, delay);
    };
    // Começa quando o número está bem dentro do ecrã (não colado ao fundo).
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) start(250); }, { threshold: 1, rootMargin: "0px 0px -12% 0px" });
    io.observe(el);
    // Se já se vê ao abrir a página (ex.: no fundo de um ecrã grande), começa na mesma pouco depois.
    const r = el.getBoundingClientRect();
    const fallback = r.top < window.innerHeight && r.bottom > 0 ? window.setTimeout(() => start(0), 1500) : 0;
    return () => { io.disconnect(); cancelAnimationFrame(raf); clearTimeout(timer); clearTimeout(fallback); };
  }, [value]);
  if (!m) return <>{value}</>;
  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <span aria-hidden>{m[1]}{n}{m[3]}</span>
    </span>
  );
}

export function Stats() {
  return (
    <section aria-label="Números da CleanDireto" className="border-y border-border bg-card py-10 sm:py-12">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-0">
          {STATS.map((st, i) => (
            <Reveal key={st.label} delay={i * 60}>
              <div className={cn("h-full", i > 0 && "lg:border-l lg:border-border lg:pl-6")}>
                <p className="text-3xl font-extrabold tracking-tight text-navy tabular-nums sm:text-4xl"><CountUp value={st.value} /></p>
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
  { year: "2023", text: "Início da atividade em Coimbra, com limpezas domésticas." },
  { year: "2024", text: "Mais serviços: pós-obra, escritórios e condomínios." },
  { year: "2025", text: "Clientes regulares em Coimbra, Condeixa-a-Nova e Lousã." },
];

/* ---------------- SERVICES ---------------- */
const SERVICES = [
  { icon: Home, title: "Limpeza Doméstica", text: "Limpeza regular ou pontual da casa: cozinha, casas de banho, quartos e zonas comuns. Inclui remoção de bolores." },
  { icon: HardHat, title: "Limpeza Pós-Obra", text: "Retiramos o pó da obra, restos de tinta e de cimento, e deixamos a casa pronta a habitar." },
  { icon: Briefcase, title: "Escritórios e Empresas", text: "Limpeza de escritórios, lojas e espaços de trabalho, em horários combinados consigo." },
  { icon: Building2, title: "Condomínios e Edifícios", text: "Entradas, escadas, elevadores e garagens, com a periodicidade de que o condomínio precisar." },
  { icon: Sofa, title: "Sofás e Carpetes", text: "Limpeza de sofás e carpetes. Indique o tecido e o tamanho para lhe darmos um preço certo." },
  { icon: Warehouse, title: "Limpeza de Telhados", text: "Remoção de musgo e sujidade acumulada. Avaliamos cada caso antes de dar orçamento." },
];

export function Services() {
  return (
    <section id="servicos" className="py-16 sm:py-24 lg:py-32">
      <Container>
        <SectionHeading eyebrow="Serviços" title="O que fazemos" subtitle="Cada orçamento é feito à medida do espaço. Escolha o serviço e fale connosco diretamente." />
        <div className="mt-10 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors duration-200 hover:border-primary/40 sm:p-7">
                <span className="grid size-12 place-items-center rounded-xl bg-secondary text-primary">
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
// Fotografias tiradas do vídeo enviado pelo Nuno (trabalho real de remoção de bolores).
const GALLERY: Record<string, Comparison[]> = {
  "Bolores": [
    { before: quartoAntes, after: quartoDepois, label: "Teto e paredes de um quarto" },
    { before: wcCantoAntes, after: wcCantoDepois, label: "Canto de casa de banho" },
    { before: wcParedeAntes, after: wcParedeDepois, label: "Parede de casa de banho" },
  ],
  "Domésticas": [], "Pós-obra": [], "Sofás e carpetes": [], "Escritórios": [], "Condomínios": [],
};

function BeforeAfter({ c }: { c: Comparison }) {
  const [pos, setPos] = useState(50);
  return (
    <figure>
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted select-none">
        <img src={c.after} alt={`Depois: ${c.label}`} width={720} height={960} loading="lazy" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={c.before} alt={`Antes: ${c.label}`} width={720} height={960} loading="lazy" className="absolute inset-0 size-full object-cover" />
        </div>
        <span className="pointer-events-none absolute top-3 left-3 rounded-md bg-navy/80 px-2.5 py-1 text-xs font-bold text-white">Antes</span>
        <span className="pointer-events-none absolute top-3 right-3 rounded-md bg-white px-2.5 py-1 text-xs font-bold text-navy">Depois</span>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 left-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-soft">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden><path d="m9 6-6 6 6 6M15 6l6 6-6 6" /></svg>
          </span>
        </div>
        <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(+e.target.value)} aria-label={`Comparar antes e depois: ${c.label}`} className="absolute inset-0 size-full cursor-ew-resize opacity-0" />
      </div>
      <figcaption className="mt-3 text-sm font-semibold text-navy">{c.label}</figcaption>
    </figure>
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
        <SectionHeading eyebrow="Trabalhos" title="Antes e depois" subtitle="Fotografias de trabalhos reais. Arraste a linha sobre cada imagem para comparar." />
        {cats.length > 1 && <Reveal className="mt-12 flex flex-wrap justify-center gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={cn("rounded-full px-5 py-2.5 text-sm font-bold transition-all", c === cat ? "bg-navy text-navy-foreground shadow-soft" : "bg-card text-navy/70 hover:text-primary")}>
              {c}
            </button>
          ))}
        </Reveal>}
        <Reveal className="mx-auto mt-10 max-w-5xl">
          {items.length ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">{items.map((c) => <BeforeAfter key={c.label} c={c} />)}</div>
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
const POINTS = [
  { title: "Fala diretamente connosco", text: "Sem centrais de atendimento. Quem lhe responde é quem organiza o serviço." },
  { title: "Orçamento antes de começar", text: "Sabe o preço antes de marcarmos. Sem custos escondidos." },
  { title: "Datas combinadas consigo", text: "Marcamos o dia e a hora que lhe dão jeito, também para empresas." },
];
export function About() {
  return (
    <section id="sobre" className="bg-muted py-16 sm:py-24 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div>
          <SectionHeading center={false} eyebrow="Sobre a CleanDireto" title="Uma empresa local, de Coimbra." />
          <Reveal delay={100}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              A CleanDireto faz limpezas para particulares e empresas em Coimbra e nas localidades à volta. Trabalhamos por marcação, com orçamento prévio, e tratamos cada espaço como se fosse nosso.
            </p>
            <ul className="mt-8 grid gap-5">
              {POINTS.map((p) => (
                <li key={p.title} className="flex gap-4">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-secondary text-primary"><Check className="size-4" /></span>
                  <span>
                    <span className="block font-extrabold text-navy">{p.title}</span>
                    <span className="mt-0.5 block text-muted-foreground">{p.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={150}>
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <p className="text-sm font-bold text-navy">O nosso percurso</p>
            <ol className="mt-6">
              {JOURNEY.map((j, i) => (
                <li key={j.year} className="relative grid grid-cols-[5rem_1fr] gap-3 pb-7 last:pb-0">
                  {i < JOURNEY.length - 1 && <span aria-hidden className="absolute top-4 bottom-0 left-[0.3rem] w-px bg-border" />}
                  <span className="relative flex items-start gap-3">
                    <span className="mt-2.5 size-2.5 shrink-0 rounded-full bg-bright ring-4 ring-secondary" />
                    <span className="text-xl font-extrabold text-navy">{j.year}</span>
                  </span>
                  <span className="pt-1 leading-relaxed text-muted-foreground">{j.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------------- PROCESS ---------------- */
const STEPS = [
  { icon: MessageCircle, title: "Fale connosco", text: "Pelo formulário, WhatsApp ou telefone. Fotografias do espaço ajudam." },
  { icon: ClipboardList, title: "Receba o orçamento", text: "Enviamos o preço, em média em 10 horas. Se for preciso, vamos ver o local." },
  { icon: CalendarCheck, title: "Marque a data", text: "Escolhe o dia e a hora que lhe dão mais jeito." },
  { icon: Sparkles, title: "Serviço feito", text: "Fazemos a limpeza no dia combinado e confirmamos consigo no fim." },
];
export function Process() {
  return (
    <section id="processo" className="py-16 sm:py-24 lg:py-32">
      <Container>
        <SectionHeading eyebrow="Como funciona" title="Do pedido à limpeza, em 4 passos" />
        <ol className="relative mt-10 grid gap-5 sm:mt-16 md:grid-cols-4 md:gap-6">
          <div aria-hidden className="absolute top-8 right-[12%] left-[12%] hidden h-px bg-border md:block" />
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <li className="relative flex items-start gap-4 md:block md:text-center">
                <span className="relative grid size-12 shrink-0 place-items-center rounded-xl border border-border bg-card text-primary md:mx-auto md:size-16"><s.icon className="size-5 md:size-6" /></span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-bright md:mt-5">Passo {i + 1}</p>
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
    <section id="video" className="py-16 sm:py-24 lg:py-32">
      <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <SectionHeading center={false} eyebrow="Em vídeo" title="Remoção de bolores, do início ao fim" subtitle="Um trabalho real da CleanDireto: bolores no teto e nas paredes de um quarto e de uma casa de banho." />
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
    <section id="zonas" className="bg-muted py-16 sm:py-24 lg:py-32">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-14">
        <div>
          <SectionHeading center={false} eyebrow="Zonas de atuação" title="Coimbra e arredores." subtitle="Trabalhamos sobretudo nestas localidades, mas deslocamo-nos a outras zonas perto de Coimbra." />
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
          <SectionHeading center={false} eyebrow="Orçamento gratuito" title="Peça o seu orçamento" subtitle="Preencha o formulário e envie por WhatsApp ou SMS. Respondemos em média em 10 horas." />
          <Reveal delay={100} className="mt-10 grid gap-3">
            {[
              { href: whatsappLink(DEFAULT_WA_MESSAGE), icon: MessageCircle, label: "WhatsApp", value: PHONE_DISPLAY, ext: true },
              { href: PHONE_TEL, icon: Phone, label: "Telefone", value: PHONE_DISPLAY },
              { href: FACEBOOK_URL, icon: Facebook, label: "Facebook", value: "CleanDireto", ext: true },
            ].map((c) => (
              <a key={c.label} href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40">
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
          <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-9">
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
        <SectionHeading eyebrow="FAQ" title="Perguntas frequentes" />
        <Reveal className="mt-12">
          <Accordion type="single" collapsible className="grid gap-3">
            {FAQ.map((f, i) => (
              <AccordionItem key={f.q} value={`i${i}`} className="rounded-xl border border-border bg-card px-5 sm:px-6">
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
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-navy px-6 py-12 text-center text-navy-foreground sm:px-12 sm:py-16">
        <div className="relative">
          <h2 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">Precisa de uma limpeza em Coimbra?</h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-foreground/75 sm:text-lg">Envie-nos uma mensagem com o que precisa. O orçamento é gratuito.</p>
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
          <p>Desenvolvido por <a href="https://neto-software.com" target="_blank" rel="noopener" className="font-semibold text-navy-foreground/80 hover:text-navy-foreground hover:underline">Anderson Neto · Neto Software</a></p>
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
