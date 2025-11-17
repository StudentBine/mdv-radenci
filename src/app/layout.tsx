import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AuthProvider from '@/components/providers/AuthProvider'
import SessionProvider from '@/components/providers/SessionProvider'
import { ToastProvider } from '@/contexts/ToastContext'
import ToastContainer from '@/components/ui/ToastContainer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'MDV Radenci',
  description: 'Uradna spletna stran društva MDV Radenci - Mladi za varstvo okolja',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sl" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <script src="https://unpkg.com/lucide@latest" defer></script>
      </head>
      <body>
        <SessionProvider>
          <AuthProvider>
            <ToastProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
              <ToastContainer />
            </ToastProvider>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  )
}