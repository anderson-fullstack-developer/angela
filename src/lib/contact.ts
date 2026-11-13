export const PHONE_DISPLAY = "+351 932 929 914";
export const PHONE_TEL = "tel:+351932929914";
export const WHATSAPP_NUMBER = "351932929914";
export const FACEBOOK_URL = "https://www.facebook.com/share/1E9kHucCe5/";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WA_MESSAGE = "Olá CleanDireto! Gostaria de pedir um orçamento.";

export type QuoteData = {
  nome: string;
  contacto: string;
  localidade: string;
  tipo: string;
  descricao: string;
};

export function buildQuoteMessage(d: QuoteData) {
  return [
    "Olá CleanDireto! Gostaria de pedir um orçamento.",
    "",
    `Nome: ${d.nome.trim()}`,
    `Contacto: ${d.contacto.trim()}`,
    `Localidade: ${d.localidade.trim()}`,
    `Tipo de limpeza: ${d.tipo}`,
    d.descricao.trim() ? `Descrição: ${d.descricao.trim()}` : "",
  ]
    .filter((l, i) => l !== "" || i === 1)
    .join("\n");
}
