# Quote requests in Google Sheets (optional)

The quote form always sends the request by **WhatsApp or SMS** to +351 932 929 914.
It can **also** save each request as a new row in a Google Sheet owned by the client.
This is switched off until the environment variable below is set.

## 1. Create the sheet (client's Google account)

1. Create a Google Sheet, e.g. **"CleanDireto — Pedidos de orçamento"**.
2. Row 1 headers: `Data | Nome | Telefone | Email | Localidade | Tipo de limpeza | Urgência | Descrição | Canal`

## 2. Add the Apps Script

In the sheet: **Extensions → Apps Script**, replace the code with:

```js
function doPost(e) {
  var d = JSON.parse(e.postData.contents);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  sheet.appendRow([
    new Date(), d.nome, d.contacto, d.email, d.localidade, d.tipo, d.urgencia, d.descricao, d.canal
  ]);
  return ContentService.createTextOutput("ok");
}
```

Optional e-mail alert on each new request (add inside `doPost`, before `return`, with the client's own address):

```js
MailApp.sendEmail("EMAIL-DO-CLIENTE", "Novo pedido de orçamento - " + d.nome,
  "Telefone: " + d.contacto + "\nEmail: " + d.email + "\nLocalidade: " + d.localidade +
  "\nServiço: " + d.tipo + "\nUrgência: " + d.urgencia + "\n\n" + d.descricao);
```

## 3. Deploy

**Deploy → New deployment → Web app**
- Execute as: **Me**
- Who has access: **Anyone**

Authorise with the client's Google account and copy the **Web app URL** (`https://script.google.com/macros/s/.../exec`).

## 4. Connect the website

In Vercel: **Project → Settings → Environment Variables**
- Name: `VITE_QUOTE_SHEET_URL`
- Value: the Web app URL

Redeploy. From then on, every WhatsApp/SMS submission is also saved in the sheet, and the privacy note under the form changes automatically.

## Privacy

Only the fields the visitor types are sent. The data goes straight to the client's own Google Sheet; nothing is stored on the website.
