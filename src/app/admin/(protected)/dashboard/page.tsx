'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Newspaper, Calendar, Image, Users } from 'lucide-react';

export default function AdminDashboard() {
  const { data: session } = useSession();

  const adminLinks = [
    {
      title: 'Novice',
      description: 'Upravljaj z novicami',
      icon: Newspaper,
      href: '/admin/novice',
      color: 'bg-blue-500',
      count: 0,
    },
    {
      title: 'Dogodki',
      description: 'Upravljaj z dogodki',
      icon: Calendar,
      href: '/admin/dogodki',
      color: 'bg-green-500',
      count: 0,
    },
    {
      title: 'Galerija',
      description: 'Upravljaj s slikami',
      icon: Image,
      href: '/admin/galerija',
      color: 'bg-purple-500',
      count: 0,
    },
    {
      title: 'Uporabniki',
      description: 'Upravljaj z uporabniki',
      icon: Users,
      href: '/admin/uporabniki',
      color: 'bg-orange-500',
      count: 1,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-black">Admin Dashboard</h1>
        <p className="text-gray-600">Dobrodošli, {session?.user?.name}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className={`${link.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <link.icon className="text-white" size={24} />
              </div>
              <h2 className="text-xl font-bold mb-2">{link.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{link.description}</p>
              <p className="text-2xl font-bold text-gray-800">{link.count}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4 text-black">Hitre akcije</h3>
          <div className="space-y-3">
            <Link href="/admin/novice/nova" className="block">
              <button className="w-full btn-primary text-left">
                + Nova novica
              </button>
            </Link>
            <Link href="/admin/dogodki/nov" className="block">
              <button className="w-full btn-primary text-left">
                + Nov dogodek
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4 text-black">Pomembne povezave</h3>
          <div className="space-y-2">
            <Link href="/" className="block text-primary-600 hover:underline">
              → Oglej si javno stran
            </Link>
            <Link href="/admin/uporabniki" className="block text-primary-600 hover:underline">
              → Upravljaj uporabnike
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
