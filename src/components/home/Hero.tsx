'use client'

import { useState, useEffect } from 'react'

export default function Hero() {
  const images = ['/hero.jpg', '/hero2.jpg', '/hero3.jpg']
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 10000)
    
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="relative text-primary-white min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Images Carousel */}
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
      ))}
      
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="container-custom section-padding relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-slide-up">
          <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
            Mladinsko društvo{' '}
            <span className="text-primary-yellow">vrelec Radenci</span>
            {' '}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white leading-relaxed">
            Povezujemo, izobražujemo in navdihujemo mlade za aktivno sodelovanje v skupnosti
          </p>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-primary-yellow w-8' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}