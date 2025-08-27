import './globals.css'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BrightLaunch — AI-accelerated websites for small businesses',
  description: 'We design and build modern, mobile-first sites for small businesses, niche markets, and nonprofits — fast and affordably.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  )
}
