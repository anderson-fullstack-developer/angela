import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const siteTitle = "ANGELA'S NETTOYAGE | Limpeza Profissional no Porto"
const siteDescription =
  'Serviços profissionais de limpeza de casas, escritórios e alojamentos no Porto e região. Peça informações ou um orçamento pelo WhatsApp.'
const shareImageAlt = "ANGELA'S NETTOYAGE — Limpeza profissional no Porto e região"

export const metadata: Metadata = {
  metadataBase: new URL('https://angelas-nettoyage-porto.netlify.app'),
  title: siteTitle,
  description: siteDescription,
  keywords: ['limpeza Porto', 'limpeza de casas', 'limpeza de escritórios', 'limpeza de alojamentos', "ANGELA'S NETTOYAGE"],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: '/',
    siteName: "ANGELA'S NETTOYAGE",
    locale: 'pt_PT',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: shareImageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/og-image.png'],
  },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
        type: 'image/png',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
        type: 'image/png',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-PT">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
