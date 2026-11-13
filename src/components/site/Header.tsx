import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import markUrl from "@/assets/cleandireto-mark.webp";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";

export const NAV = [
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre", label: "Sobre" },
  { href: "#processo", label: "Como funciona" },
  { href: "#zonas", label: "Zonas" },
  { href: "#faq", label: "FAQ" },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label="CleanDireto — início">
      <img src={markUrl} alt="" width={44} height={44} className="size-11 rounded-xl shadow-soft" />
      <span className="leading-none">
        <span className={cn("block text-lg font-extrabold tracking-tight", light ? "text-navy-foreground" : "text-navy")}>CleanDireto</span>
        <span className={cn("mt-1 block text-[10px] font-semibold uppercase tracking-[0.28em]", light ? "text-navy-foreground/60" : "text-muted-foreground")}>Limpezas</span>
      </span>
    </a>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 16);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className={cn("mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 lg:px-6", scrolled || open ? "glass shadow-soft border border-border/70" : "")}>
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="rounded-full px-4 py-2 text-sm font-semibold text-navy/75 transition-colors hover:bg-secondary hover:text-primary">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={PHONE_TEL} className="hidden items-center gap-2 px-3 text-sm font-bold text-navy hover:text-primary md:flex">
            <Phone className="size-4" /> {PHONE_DISPLAY}
          </a>
          <Button asChild variant="hero" className="hidden sm:inline-flex">
            <a href="#orcamento">Pedir Orçamento</a>
          </Button>
          <button className="grid size-10 place-items-center rounded-full text-navy lg:hidden" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="glass mx-auto mt-2 max-w-7xl rounded-2xl border border-border/70 p-3 shadow-soft lg:hidden" aria-label="Menu móvel">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 font-semibold text-navy hover:bg-secondary">
              {n.label}
            </a>
          ))}
          <Button asChild variant="hero" size="xl" className="mt-2 w-full">
            <a href="#orcamento" onClick={() => setOpen(false)}>Pedir Orçamento Gratuito</a>
          </Button>
        </nav>
      )}
    </header>
  );
}
