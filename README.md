# CleanDireto

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TanStack Start](https://img.shields.io/badge/TanStack-Start-FF4154)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)

**Website for CleanDireto**, a professional cleaning company in Coimbra, Portugal: home, post-construction, office, condominium, sofa/carpet and roof cleaning.

> Status: final version approved by the client (November 2026). No statistics, awards or testimonials are shown until real ones are provided.

## What the site includes

- **Services** in cards, each with a button that opens WhatsApp with the request already written
- **About**, **why us** and a four-step **how it works** section
- **Video** of real work (mould removal) in a vertical player with poster, loaded only on play
- **Service area**: Coimbra and surroundings (Condeixa-a-Nova, Lousã) with a Google map
- **Quote form** (name, phone, email, town, service, urgency, details) sent by **WhatsApp or SMS**, with optional logging to the client's Google Sheet ([setup](docs/google-sheets.md))
- **FAQ**, floating WhatsApp button, phone and Facebook links
- Before/after gallery and testimonials that appear automatically once real photos and reviews are added
- Official logo in header and footer, favicon set from the logo
- SEO for Coimbra: canonical URL, structured data (LocalBusiness), sitemap, robots.txt and a 1200×630 share image

## Tech stack

React 19 · TanStack Start · TypeScript · Tailwind CSS · Radix UI · Vitest · designed in Lovable · deployed on Vercel

## Running locally

```bash
npm install
npm run dev
npm test
```

Deployed on Vercel: build settings live in [`vercel.json`](vercel.json) (`NITRO_PRESET=vercel`). A [`netlify.toml`](netlify.toml) is also included.

## Author

**Anderson Neto**, Full-Stack Developer in Lisbon.
