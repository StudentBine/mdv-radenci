'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementiraj pošiljanje emaila
    console.log('Form data:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold mb-8">Kontakt</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Kontaktni podatki</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="text-primary-600 mt-1" />
              <div>
                <h3 className="font-bold">Naslov</h3>
                <p className="text-gray-600">
                  Mladinsko društvo Vrelec Radenci<br />
                  Radenci 123<br />
                  9252 Radenci
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="text-primary-600 mt-1" />
              <div>
                <h3 className="font-bold">Email</h3>
                <a href="mailto:info@mdv-radenci.si" className="text-primary-600 hover:underline">
                  info@mdv-radenci.si
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="text-primary-600 mt-1" />
              <div>
                <h3 className="font-bold">Telefon</h3>
                <a href="tel:+38612345678" className="text-primary-600 hover:underline">
                  +386 1 234 5678
                </a>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Pošlji sporočilo</h2>

          {submitted && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Sporočilo uspešno poslano!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Ime in priimek
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-gray-700 mb-2">
                Zadeva
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 mb-2">
                Sporočilo
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Pošlji sporočilo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
