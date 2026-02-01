import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: 'Life OS - Universal Intelligence',
    template: '%s | Life OS',
  },
  description: 'Your personal life operating system for optimal cognitive performance. Track habits, manage tasks, monitor mood, and achieve your goals.',
  keywords: ['productivity', 'habit tracker', 'task manager', 'mood tracker', 'life management', 'personal development'],
  authors: [{ name: 'Life OS' }],
  creator: 'Life OS',
  publisher: 'Life OS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lifeos.app'),
  openGraph: {
    title: 'Life OS - Universal Intelligence',
    description: 'Your personal life operating system for optimal cognitive performance',
    url: 'https://lifeos.app',
    siteName: 'Life OS',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Life OS - Universal Intelligence',
    description: 'Your personal life operating system for optimal cognitive performance',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Life OS',
  },
  generator: 'Life OS'
}

export const viewport: Viewport = {
  themeColor: '#e0e5ec',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-[#e0e5ec] min-h-screen overflow-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
