import { useEffect, useState } from "react";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import lockupUrl from "@/assets/cleandireto-lockup.webp";
import { DEFAULT_WA_MESSAGE, PHONE_DISPLAY, PHONE_TEL, whatsappLink } from "@/lib/contact";

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
      {/* Logótipo oficial da CleanDireto (gota + "CLEANDIRETO LIMPEZAS") */}
      <img src={lockupUrl} alt="CleanDireto Limpezas" width={238} height={44} className={cn("h-10 w-auto sm:h-11", light && "rounded-lg bg-white px-2 py-1")} />
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
          <a href={whatsappLink(DEFAULT_WA_MESSAGE)} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp"
            className="hidden size-10 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground transition-transform hover:scale-105 sm:grid">
            <MessageCircle className="size-5" />
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
