import Link from 'next/link';
import { Facebook, Instagram, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MDV Radenci</h3>
            <p className="text-gray-400">
              Mladinsko društvo Vrelec Radenci
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Povezave</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/o-nas" className="text-gray-400 hover:text-white">
                  O nas
                </Link>
              </li>
              <li>
                <Link href="/novice" className="text-gray-400 hover:text-white">
                  Novice
                </Link>
              </li>
              <li>
                <Link href="/dogodki" className="text-gray-400 hover:text-white">
                  Dogodki
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-400 hover:text-white">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Sledite nam</h3>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-white">
                <Facebook size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="text-gray-400 hover:text-white">
                <Instagram size={24} />
              </a>
              <a href="mailto:info@mdv-radenci.si" className="text-gray-400 hover:text-white">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Mladinsko društvo Vrelec Radenci. Vse pravice pridržane.</p>
        </div>
      </div>
    </footer>
  );
}
