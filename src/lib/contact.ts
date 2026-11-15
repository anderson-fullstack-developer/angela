export const PHONE_DISPLAY = "+351 932 929 914";
export const PHONE_TEL = "tel:+351932929914";
export const WHATSAPP_NUMBER = "351932929914";
export const FACEBOOK_URL = "https://www.facebook.com/share/1E9kHucCe5/";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WA_MESSAGE = "Olá CleanDireto! Gostaria de pedir um orçamento.";

export const URGENCY_OPTIONS = ["Sem urgência", "Nos próximos dias", "Esta semana", "Urgente — assim que possível"] as const;

export type QuoteData = {
  nome: string;
  contacto: string;
  email: string;
  localidade: string;
  tipo: string;
  urgencia: string;
  descricao: string;
};

/** Mensagem do pedido de orçamento (sem emojis: algumas versões do WhatsApp mostram-nos como "?"). */
export function buildQuoteMessage(d: QuoteData) {
  return [
    "Olá CleanDireto! Gostaria de pedir um orçamento.",
    "",
    `Nome: ${d.nome.trim()}`,
    `Telefone: ${d.contacto.trim()}`,
    d.email.trim() ? `Email: ${d.email.trim()}` : null,
    `Localidade: ${d.localidade.trim()}`,
    `Tipo de limpeza: ${d.tipo}`,
    `Urgência: ${d.urgencia}`,
    d.descricao.trim() ? `Descrição: ${d.descricao.trim()}` : null,
  ]
    .filter((l): l is string => l !== null)
    .join("\n");
}

/**
 * Registo opcional dos pedidos numa folha Google Sheets do cliente.
 * Ativa-se definindo VITE_QUOTE_SHEET_URL (URL da Web App do Google Apps Script) na Vercel.
 * Sem esse URL, nada é enviado para fora: o pedido segue apenas por WhatsApp/SMS.
 * Instruções: docs/google-sheets.md
 */
export const SHEET_URL: string | undefined = (import.meta.env["VITE_QUOTE_SHEET_URL"] as string | undefined) || undefined;

export function saveQuoteToSheet(d: QuoteData, canal: "WhatsApp" | "SMS") {
  if (!SHEET_URL) return;
  const body = JSON.stringify({ ...d, canal, enviadoEm: new Date().toISOString() });
  try {
    fetch(SHEET_URL, { method: "POST", mode: "no-cors", keepalive: true, headers: { "Content-Type": "text/plain;charset=utf-8" }, body }).catch(() => {});
  } catch {
    /* o pedido continua por WhatsApp/SMS mesmo que o registo falhe */
  }
}
