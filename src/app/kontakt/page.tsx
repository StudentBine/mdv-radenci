'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log('Form submitted:', formData)
    alert('Hvala za vaše sporočilo! Odgovorili vam bomo v najkrajšem možnem času.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const contactInfo = [
    {
      icon: '📧',
      title: 'E-pošta',
      content: 'info@mdv-radenci.si',
      link: 'mailto:info@mdv-radenci.si'
    },
    {
      icon: '📱',
      title: 'Telefon',
      content: '+386 40 123 456',
      link: 'tel:+38640123456'
    },
    {
      icon: '📍',
      title: 'Lokacija',
      content: 'Občina Radenci, Slovenija',
      link: 'https://maps.google.com/?q=Radenci'
    },
    {
      icon: '🕒',
      title: 'Ure srečanj',
      content: 'Ponedeljek - Petek: 16:00 - 19:00',
      link: null
    }
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-green to-green-600 text-primary-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
              Kontakt
            </h1>
            <p className="text-xl md:text-2xl text-green-100 leading-relaxed">
              Stopite v stik z nami - skupaj lahko naredimo razliko
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 animate-fade-in">
              <h2 className="font-heading font-bold text-3xl mb-8 text-gray-900">
                Kje nas najdete
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div 
                    key={item.title}
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white transition-colors duration-200 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      {item.link ? (
                        <a 
                          href={item.link} 
                          className="text-primary-green hover:text-green-600 transition-colors duration-200"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-gray-600">{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="mt-8 p-6 bg-primary-white rounded-xl shadow-lg">
                <h3 className="font-heading font-semibold text-xl mb-4 text-gray-900">
                  Sledite nam
                </h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-primary-green text-primary-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-200">
                    <span className="font-medium">f</span>
                  </a>
                  <a href="#" className="w-12 h-12 bg-primary-green text-primary-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-200">
                    <span className="font-medium">in</span>
                  </a>
                  <a href="#" className="w-12 h-12 bg-primary-green text-primary-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-200">
                    <span className="font-medium">ig</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 animate-slide-up">
              <div className="card p-8">
                <h2 className="font-heading font-bold text-3xl mb-6 text-gray-900">
                  Pošljite sporočilo
                </h2>
                <p className="text-gray-600 mb-8">
                  Imate vprašanje, predlog ali želite sodelovati z nami? Z veseljem vas bomo poslušali.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Polno ime *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors duration-200"
                        placeholder="Vnesite vaše polno ime"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        E-poštni naslov *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors duration-200"
                        placeholder="vnesite@primer.si"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Zadeva *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors duration-200"
                    >
                      <option value="">Izberite zadevo</option>
                      <option value="sodelovanje">Povabilo k sodelovanju</option>
                      <option value="vprasanje">Splošno vprašanje</option>
                      <option value="predlog">Predlog projekta</option>
                      <option value="prijava">Prijava za članstvo</option>
                      <option value="drugo">Drugo</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Sporočilo *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors duration-200 resize-vertical"
                      placeholder="Podrobno opišite vaše vprašanje ali predlog..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary py-4 text-lg"
                  >
                    Pošlji sporočilo
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}