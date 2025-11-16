'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useLucide } from '@/hooks/useLucide';

export default function EditUserPage() {
  useLucide() // Initialize lucide icons
  const { data: session, status } = useSession()
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin',
  });

  // Check if user is admin
  useEffect(() => {
    if (status === 'loading') return
    
    const userRole = (session?.user as { role?: string })?.role
    if (status === 'authenticated' && userRole !== 'admin') {
      router.replace('/admin/dashboard')
    }
  }, [status, session, router])

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchUser = async () => {
        try {
          const response = await fetch(`/api/users/${params.id}`);
          if (!response.ok) throw new Error('Failed to fetch user');
          const data = await response.json();
          setFormData({
            name: data.name,
            email: data.email,
            password: '',
            confirmPassword: '',
            role: data.role,
          });
        } catch (err) {
          setError('Napaka pri nalaganju uporabnika');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [params.id, status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Gesli se ne ujemata');
      setSaving(false);
      return;
    }

    if (formData.password && formData.password.length < 6) {
      setError('Geslo mora biti dolgo vsaj 6 znakov');
      setSaving(false);
      return;
    }

    try {
      const updateData: Record<string, string> = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };

      // Samo če je vneseno novo geslo
      if (formData.password) {
        updateData.password = formData.password;
      }

      const response = await fetch(`/api/users/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update user');
      }

      router.push('/admin/uporabniki');
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Napaka pri shranjevanju uporabnika');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/uporabniki"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <i data-lucide="arrow-left" className="w-5 h-5"></i>
          Nazaj na uporabnike
        </Link>
        <h1 className="text-3xl font-bold">Uredi uporabnika</h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Ime in priimek *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
            />
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Spremeni geslo</h3>
            <p className="text-sm text-gray-500 mb-4">
              Pustite prazno, če ne želite spremeniti gesla
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Novo geslo
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                />
                <p className="text-sm text-gray-500 mt-1">Najmanj 6 znakov</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Potrdi novo geslo
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Vloga *
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
            >
              <option value="admin">Admin</option>
              <option value="editor">Urednik</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary disabled:opacity-50"
          >
            {saving ? 'Shranjevanje...' : 'Shrani spremembe'}
          </button>
          <Link href="/admin/uporabniki">
            <button type="button" className="btn-secondary">
              Prekliči
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
