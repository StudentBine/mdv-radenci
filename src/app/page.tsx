import { Hero } from '@/components/home/Hero';
import { AboutSection } from '@/components/home/AboutSection';
import { NewsSection } from '@/components/home/NewsSection';
import { EventsSection } from '@/components/home/EventsSection';

// Force dynamic rendering - this page fetches data from database
export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <NewsSection />
      <EventsSection />
    </>
  );
}
