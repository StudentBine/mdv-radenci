'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { LayoutDashboard, Newspaper, Calendar, Image, Users, LogOut } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Novice', href: '/admin/novice', icon: Newspaper },
  { name: 'Dogodki', href: '/admin/dogodki', icon: Calendar },
  { name: 'Galerija', href: '/admin/galerija', icon: Image },
  { name: 'Uporabniki', href: '/admin/uporabniki', icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <Link href="/" className="text-xl font-bold">
          MDV Radenci
        </Link>
        <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
      </div>

      <nav className="space-y-2">
        {navigation.map((item) => {
          const isActive = pathname?.startsWith(item.href) || false;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="border-t border-gray-800 pt-4">
          <div className="text-sm text-gray-400 mb-2">
            {session?.user?.name}
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center gap-2 text-gray-300 hover:text-white w-full"
          >
            <LogOut size={20} />
            <span>Odjava</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
