import Hero from '@/components/home/Hero'
import AboutSection from '@/components/home/AboutSection'
import NewsSection from '@/components/home/NewsSection'
import EventsSection from '@/components/home/EventsSection'

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <NewsSection />
      {/*<EventsSection />*/}
    </>
  )
}