'use client'

import Link from 'next/link'
import { useLucide } from '@/hooks/useLucide'

export default function Footer() {
  useLucide() // Initialize lucide icons
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-primary-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center">
                <span className="text-primary-white font-heading font-bold">MDV</span>
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl">MDV Radenci</h2>
                <p className="text-gray-400">Mladinsko društvo vrelec Radenci</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Mladinsko društvo Vrelec Radenci je neprofitna organizacija, ki si prizadeva za razvoj mladih in skupnosti skozi različne projekte in aktivnosti.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/mdvrelecradenci" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
                aria-label="Facebook"
              >
                <i data-lucide="facebook" className="w-5 h-5"></i>
              </a>
              <a 
                href="https://www.instagram.com/mdv.radenci/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
                aria-label="Instagram"
              >
                <i data-lucide="instagram" className="w-5 h-5"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Hitre povezave</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary-yellow transition-colors duration-300">
                  Domov
                </Link>
              </li>
              <li>
                <Link href="/novice" className="text-gray-400 hover:text-primary-yellow transition-colors duration-300">
                  Novice
                </Link>
              </li>
              <li>
                <Link href="/o-nas" className="text-gray-400 hover:text-primary-yellow transition-colors duration-300">
                  O nas
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-400 hover:text-primary-yellow transition-colors duration-300">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Kontakt</h3>
            <address className="not-italic text-gray-400 space-y-2">
              <p>MDV Radenci</p>
              <p>
                <a href="mailto:info@mdv-radenci.si" className="hover:text-primary-yellow transition-colors duration-300">
                  info@mdv-radenci.si
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} MDV Radenci. Vse pravice pridržane.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/pravice" className="text-gray-400 hover:text-primary-yellow text-sm transition-colors duration-300">
              Pravice
            </Link>
            <Link href="/zasebnost" className="text-gray-400 hover:text-primary-yellow text-sm transition-colors duration-300">
              Zasebnost
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}