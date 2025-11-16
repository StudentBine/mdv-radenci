import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-green to-green-600 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8 animate-bounce">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-primary-white rounded-full shadow-2xl mb-6">
            <span className="text-6xl">🔍</span>
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="font-heading font-bold text-8xl md:text-9xl text-primary-white mb-4 animate-fade-in">
          404
        </h1>
        
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-white mb-4 animate-fade-in">
          Ups! Stran ni najdena
        </h2>
        
        <p className="text-xl text-green-100 mb-8 max-w-md mx-auto animate-fade-in">
          Stran, ki jo iščete, ne obstaja ali pa je bila premaknjena.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 bg-primary-white text-primary-green rounded-lg font-heading font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Domov
          </Link>
          
          <Link
            href="/novice"
            className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-primary-white text-primary-white rounded-lg font-heading font-semibold hover:bg-primary-white hover:text-primary-green transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Novice
          </Link>

          <Link
            href="/kontakt"
            className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-primary-white text-primary-white rounded-lg font-heading font-semibold hover:bg-primary-white hover:text-primary-green transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Kontakt
          </Link>
        </div>
      </div>
    </div>
  )
}
