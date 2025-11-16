import Link from 'next/link'

export default function AboutSection() {
  const features = [
    {
      icon: '🌱',
      title: 'Trajnostni razvoj',
      description: 'Spodbujamo trajnostne prakse in ekološko zavest med mladimi.'
    },
    {
      icon: '🤝',
      title: 'Skupnost',
      description: 'Združujemo mlade, ki želijo pozitivno vplivati na okolje.'
    },
    {
      icon: '🚀',
      title: 'Inovacije',
      description: 'Razvijamo inovativne projekte za reševanje okoljskih izzivov.'
    }
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-6 text-gray-900">
              Kdo smo{' '}
              <span className="text-primary-green">mi</span>
              ?
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              MDV Radenci je mladinska organizacija, posvečena varstvu okolja in trajnostnemu razvoju. 
              Zavzemanje za čisto okolje, ozaveščanje javnosti in aktivno sodelovanje v skupnosti so naši glavni cilji.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Skozi različne projekte, delavnice in akcije čistjenja vplivamo na pozitivne spremembe 
              v naši okolici in navdihujemo druge k ekološki odgovornosti.
            </p>
            <Link href="/o-nas" className="btn-primary inline-flex items-center">
              Spoznajte nas bolje
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="card p-6 hover:border-primary-green transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{feature.icon}</div>
                  <div>
                    <h3 className="font-heading font-semibold text-xl mb-2 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}