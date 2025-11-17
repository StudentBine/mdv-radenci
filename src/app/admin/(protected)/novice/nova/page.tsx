'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLucide } from '@/hooks/useLucide';
import { useToast } from '@/contexts/ToastContext';
import ImageUpload from '@/components/admin/ImageUpload';

export default function NewNewsPage() {
  useLucide() // Initialize lucide icons
  const router = useRouter();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    published: false,
  });
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const uploadImage = async (file: File): Promise<string> => {
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formDataUpload,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Napaka pri nalaganju slike');
    }

    const data = await response.json();
    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let imageUrl = formData.imageUrl;
      
      // Upload image if selected
      if (selectedFile) {
        setUploading(true);
        try {
          imageUrl = await uploadImage(selectedFile);
        } catch (uploadError) {
          throw new Error(`Napaka pri nalaganju slike: ${uploadError instanceof Error ? uploadError.message : 'Neznana napaka'}`);
        } finally {
          setUploading(false);
        }
      }

      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          imageUrl
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create news');
      }

      addToast(
        `Novica "${formData.title}" je bila uspešno ${formData.published ? 'objavljena' : 'shranjena'}!`,
        'success'
      );
      router.push('/admin/novice');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Napaka pri shranjevanju novice';
      setError(errorMessage);
      addToast(errorMessage, 'error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/novice"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <i data-lucide="arrow-left" className="w-5 h-5"></i>
          Nazaj na novice
        </Link>
        <h1 className="text-3xl font-bold">Nova novica</h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Naslov *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
              Izvleček
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
              placeholder="Kratek opis novice..."
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Vsebina *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={12}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
              placeholder="Polna vsebina novice..."
            />
          </div>

          <ImageUpload
            currentImage={formData.imageUrl}
            onImageChange={(file) => {
              setSelectedFile(file);
            }}
            label="Naslovna slika"
          />
          {uploading && (
            <div className="text-sm text-blue-600">
              Nalaganje slike...
            </div>
          )}

          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
              Objavi novico
            </label>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            disabled={loading || uploading}
            className="btn-primary disabled:opacity-50"
          >
            {uploading ? 'Nalaganje slike...' : loading ? 'Shranjevanje...' : 'Shrani novico'}
          </button>
          <Link href="/admin/novice">
            <button type="button" className="btn-secondary">
              Prekliči
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
