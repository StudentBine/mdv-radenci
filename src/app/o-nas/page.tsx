import Link from 'next/link'

const teamMembers = [
  {
    name: 'Ana Kovač',
    role: 'Predsednica',
    bio: 'Ana vodi društvo že 3 leta in je strastna zagovornica trajnostnega razvoja.',
    image: '/images/team/ana.jpg'
  },
  {
    name: 'Marko Novak',
    role: 'Podpredsednik',
    bio: 'Marko se ukvarja z organizacijo dogodkov in projektov za mlade.',
    image: '/images/team/marko.jpg'
  },
  {
    name: 'Lina Horvat',
    role: 'Tajnica',
    bio: 'Lina skrbi za administracijo in komunikacijo z člani.',
    image: '/images/team/lina.jpg'
  },
  {
    name: 'Peter Kralj',
    role: 'Član odbora',
    bio: 'Peter je specialist za okoljske projekte in sodelovanje s šolami.',
    image: '/images/team/peter.jpg'
  }
]

const values = [
  {
    icon: '🌍',
    title: 'Trajnostnost',
    description: 'Delujemo v skladu z načeli trajnostnega razvoja za ohranitev naravnih virov.'
  },
  {
    icon: '👥',
    title: 'Skupnost',
    description: 'Vabimo vse generacije k sodelovanju pri varstvu okolja.'
  },
  {
    icon: '🔬',
    title: 'Inovativnost',
    description: 'Iščemo inovativne rešitve za okoljske izzive našega časa.'
  },
  {
    icon: '🤝',
    title: 'Sodelovanje',
    description: 'Sodelujemo z lokalno skupnostjo, šolami in podjetji.'
  }
]

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-green to-green-600 text-primary-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
              O nas
            </h1>
            <p className="text-xl md:text-2xl text-green-100 leading-relaxed">
              Spoznajte ekipo in vrednote, ki nas vodijo pri varstvu okolja
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-primary-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-6">
                Naše poslanstvo
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                MDV Radenci je mladinska organizacija, ustanovljena leta 2018, ki združuje mlade ljudi, 
                ki jih skrbi za okolje in prihodnost našega planeta.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Naš glavni cilj je spodbujati trajnostne prakse, dvigovati zavest o okoljskih vprašanjih 
                in aktivno delovati za ohranitev naravne dediščine v občini Radenci in širše.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/kontakt" className="btn-primary">
                  Pridruži se nam
                </Link>
                <Link href="/novice" className="btn-outline">
                  Naše aktivnosti
                </Link>
              </div>
            </div>
            <div className="animate-slide-up">
              <div className="bg-gradient-to-br from-primary-yellow to-primary-green rounded-2xl p-8 text-primary-white">
                <h3 className="font-heading font-bold text-2xl mb-4">Naši dosežki</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">50+</div>
                    <div className="text-green-100">Prostovoljcev</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">24</div>
                    <div className="text-green-100">Uspešnih projektov</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">3</div>
                    <div className="text-green-100">Partnerjev</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">2018</div>
                    <div className="text-green-100">Leto ustanovitve</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-4">
              Naše vrednote
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Vodilna načela, ki nas usmerjajo pri vsaki odločitvi in dejanju
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className="card p-6 text-center hover:border-primary-green transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="font-heading font-semibold text-xl mb-3 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-primary-white">
        <div className="container-custom">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-4">
              Naš tim
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Spoznajte strastne posameznike, ki stojijo za vsemi našimi aktivnostmi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={member.name}
                className="card p-6 text-center group hover:border-primary-green transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary-green to-primary-yellow rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-primary-white font-heading font-bold text-lg">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2 text-gray-900">
                  {member.name}
                </h3>
                <div className="text-primary-green font-medium mb-3">
                  {member.role}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}