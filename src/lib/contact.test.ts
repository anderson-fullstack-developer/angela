import { describe, expect, it } from "vitest";
import { buildQuoteMessage, whatsappLink } from "./contact";

describe("contact", () => {
  it("opens WhatsApp on the CleanDireto number", () => {
    expect(whatsappLink("Olá")).toBe("https://wa.me/351932929914?text=Ol%C3%A1");
  });
  it("includes every form field in the quote message", () => {
    const m = buildQuoteMessage({ nome: "Ana", contacto: "912", email: "ana@exemplo.pt", localidade: "Lousã", tipo: "Limpeza Pós-Obra", urgencia: "Esta semana", descricao: "T2" });
    expect(m).toContain("Nome: Ana");
    expect(m).toContain("Localidade: Lousã");
    expect(m).toContain("Tipo de limpeza: Limpeza Pós-Obra");
    expect(m).toContain("Descrição: T2");
    expect(m).toContain("Email: ana@exemplo.pt");
    expect(m).toContain("Urgência: Esta semana");
    expect(m).not.toMatch(/[\u{1F300}-\u{1FAFF}]/u);
  });
});
