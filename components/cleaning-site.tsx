'use client'

import { useState } from 'react'
import { ArrowDown, ArrowRight, Check, House, MapPin, Menu, MessageCircle, Sparkles, X, BriefcaseBusiness, Building2 } from 'lucide-react'

const whatsapp = 'https://wa.me/351914876168'
const defaultMessage = "Olá! Gostaria de pedir um orçamento à ANGELA'S NETTOYAGE. Podem dar-me mais informações?"
const services = [
  { title: 'Limpeza de Casas', text: 'Serviços de limpeza para ajudar a manter a sua casa limpa, organizada e agradável.', icon: House, number: '01' },
  { title: 'Limpeza de Escritórios', text: 'Limpeza de espaços de trabalho, contribuindo para ambientes mais cuidados e acolhedores.', icon: BriefcaseBusiness, number: '02' },
  { title: 'Limpeza de Alojamentos', text: 'Serviços de limpeza adaptados às necessidades dos seus espaços de alojamento.', icon: Building2, number: '03' },
]
const navLinks = [['Início', '#inicio'], ['Serviços', '#servicos'], ['Sobre Nós', '#sobre'], ['Zonas de Atuação', '#zonas'], ['Contactos', '#contactos']]

function QuoteLink({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <a className={className} href={`${whatsapp}?text=${encodeURIComponent(defaultMessage)}`} target="_blank" rel="noreferrer">{children}</a>
}

export function CleaningSite() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const message = [
      "Olá! Gostaria de pedir um orçamento à ANGELA'S NETTOYAGE.",
      `Nome: ${form.get('nome')}`,
      `Telemóvel: ${form.get('telemovel')}`,
      `Tipo de serviço: ${form.get('servico')}`,
      `Localidade: ${form.get('localidade')}`,
      `Mensagem: ${form.get('mensagem') || '—'}`,
    ].join('\n')
    window.open(`${whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  return (
    <main>
      <div className="topline"><span>Serviços de limpeza no Porto e região</span><a href="tel:+351914876168">+351 914 876 168</a></div>
      <header className="site-header">
        <a href="#inicio" className="brand" aria-label="ANGELA'S NETTOYAGE — início">
          <span className="brand-name">Angela&apos;s <strong>Nettoyage</strong></span>
          <img src="/angela-cleaning-logo.png" alt="" aria-hidden="true" />
        </a>
        <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="Navegação principal">
          {navLinks.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <QuoteLink className="button button-small nav-cta">Pedir orçamento <ArrowRight size={15} /></QuoteLink>
        </nav>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> Cuidado que se sente</div>
          <h1>Limpeza profissional,<br /><em>espaços felizes.</em></h1>
          <p className="hero-lead">Na ANGELA'S NETTOYAGE, ajudamos a manter os seus espaços limpos e cuidados, com serviços de limpeza no Porto e região.</p>
          <div className="hero-actions"><QuoteLink className="button">Solicitar orçamento <ArrowRight size={17} /></QuoteLink><a className="text-link" href="#servicos">Conhecer os serviços <ArrowDown size={15} /></a></div>
          <div className="hero-note"><span className="note-icon"><Check size={15} /></span><span>Uma conversa simples.<br /><strong>Um espaço mais cuidado.</strong></span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-wrap"><img src="/clean-home-hero.png" alt="Sala luminosa e cuidada, sem pessoas" /><div className="image-caption"><span className="caption-dot" /> DEMONSTRAÇÃO</div></div>
          <div className="floating-card"><span className="floating-icon"><Sparkles size={19} /></span><span><strong>Um novo brilho</strong><small>em cada espaço</small></span></div>
          <div className="hero-stamp">Porto<br /><span>& região</span></div>
        </div>
      </section>

      <section className="services section-pad" id="servicos">
        <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> O que fazemos</div><h2>O cuidado certo<br /><em>para cada espaço.</em></h2></div><p>Serviços de limpeza pensados para as necessidades do seu dia a dia.</p></div>
        <div className="service-grid">{services.map(({ title, text, icon: Icon, number }) => <article className="service-card" key={title}><div className="service-top"><span className="service-icon"><Icon size={23} strokeWidth={1.6} /></span><span className="service-number">{number}</span></div><h3>{title}</h3><p>{text}</p><QuoteLink className="service-link">Pedir orçamento <ArrowRight size={15} /></QuoteLink></article>)}</div>
      </section>

      <section className="about" id="sobre"><div className="about-art"><img src="/clean-home-hero.png" alt="Detalhe de um espaço doméstico cuidado" /><div className="about-seal"><Sparkles size={20} /><span>Mais cuidado<br />no seu espaço</span></div></div><div className="about-copy"><div className="eyebrow"><span className="eyebrow-line" /> Sobre a empresa</div><h2>Espaços cuidados.<br /><em>Mais leveza no dia.</em></h2><p>Na ANGELA'S NETTOYAGE, dedicamo-nos a prestar serviços de limpeza para casas, escritórios e alojamentos no Porto e região.</p><p>O nosso objetivo é ajudar cada cliente a manter os seus espaços limpos, cuidados e agradáveis, com uma comunicação simples e próxima.</p><QuoteLink className="button">Fale connosco <ArrowRight size={17} /></QuoteLink></div></section>

      <section className="service-area" id="zonas"><div className="area-icon"><MapPin size={23} /></div><div><div className="eyebrow">Onde estamos</div><h2>Serviços de limpeza no <em>Porto e região.</em></h2><p>A ANGELA'S NETTOYAGE presta serviços de limpeza na cidade do Porto e região. Entre em contacto para confirmar a disponibilidade na sua localidade.</p></div><QuoteLink className="button button-outline">Consultar disponibilidade <ArrowRight size={16} /></QuoteLink></section>

      <section className="contact section-pad" id="contactos"><div className="contact-intro"><div className="eyebrow"><span className="eyebrow-line" /> Vamos conversar</div><h2>Precisa de serviços<br />de <em>limpeza?</em></h2><p>Entre em contacto com a ANGELA'S NETTOYAGE e solicite informações ou um orçamento para o seu espaço.</p><a className="contact-phone" href="tel:+351914876168"><span><MessageCircle size={19} /></span> +351 914 876 168</a><QuoteLink className="button whatsapp-cta"><MessageCircle size={18} /> Pedir orçamento pelo WhatsApp <ArrowRight size={16} /></QuoteLink></div>
        <form className="contact-form" onSubmit={handleSubmit}><div className="form-heading"><h3>Conte-nos o que precisa</h3><p>Preencha os dados e continue a conversa pelo WhatsApp.</p></div><div className="form-row"><label>Nome<input name="nome" type="text" autoComplete="name" placeholder="O seu nome" required /></label><label>Telemóvel<input name="telemovel" type="tel" autoComplete="tel" placeholder="O seu número" required /></label></div><div className="form-row"><label>Tipo de serviço<select name="servico" defaultValue="" required><option value="" disabled>Selecione uma opção</option><option>Limpeza de Casas</option><option>Limpeza de Escritórios</option><option>Limpeza de Alojamentos</option></select></label><label>Localidade<input name="localidade" type="text" placeholder="Ex.: Porto" required /></label></div><label>Mensagem <span className="optional">(opcional)</span><textarea name="mensagem" rows={3} placeholder="Mais detalhes sobre o espaço ou o que procura" /></label><button className="button submit-button" type="submit">{submitted ? 'Abrir novamente no WhatsApp' : 'Enviar pedido'} <ArrowRight size={16} /></button><p className="form-privacy">O seu pedido será preparado numa mensagem de WhatsApp. Não é enviado nem guardado neste website.</p></form>
      </section>

      <footer className="footer"><a href="#inicio" className="footer-brand">ANGELA'S <span>NETTOYAGE</span></a><p>Serviços de limpeza no Porto e região</p><nav aria-label="Navegação do rodapé">{navLinks.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav><a className="footer-phone" href="tel:+351914876168">+351 914 876 168</a><div className="footer-bottom"><span>© {new Date().getFullYear()} ANGELA'S NETTOYAGE</span><span>Limpeza profissional no Porto e região</span></div></footer>
      <QuoteLink className="floating-whatsapp" aria-label="Pedir orçamento pelo WhatsApp"><MessageCircle size={22} /><span>WhatsApp</span></QuoteLink>
    </main>
  )
}
