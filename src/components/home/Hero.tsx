import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800">
      {/* Placeholder za sliko - dodajte svojo sliko v /public/hero-image.jpg */}
      {/* <div className="absolute inset-0 z-0">
        <Image
          src="/hero-image.jpg"
          alt="MDV Radenci"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div> */}

      <div className="relative z-10 text-center text-white container-custom">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Mladinsko društvo Vrelec Radenci
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Povezujemo mlade in ustvarjamo priložnosti
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/o-nas" className="btn-primary">
            Spoznaj nas
          </Link>
          <Link href="/kontakt" className="btn-secondary bg-white text-primary-600 hover:bg-gray-100">
            Kontakt
          </Link>
        </div>
      </div>
    </section>
  );
}
