import Link from 'next/link'
import EventCard from '@/components/events/EventCard'
import { db } from '@/lib/db'
import { events } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export default async function EventsSection() {
  // Fetch upcoming events from database
  const upcomingEvents = await db.select()
    .from(events)
    .where(eq(events.published, true))
    .orderBy(events.eventDate)
    .limit(3)

  return (
    <section className="section-padding bg-gradient-to-br from-primary-green to-green-600 text-primary-white">
      <div className="container-custom">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Prihajajoči{' '}
            <span className="text-primary-yellow">dogodki</span>
          </h2>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Oglejte si, kaj pripravljamo v bližnji prihodnosti
          </p>
        </div>

        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <EventCard 
                key={event.id}
                event={event}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 opacity-50">📅</div>
            <p className="text-xl text-green-100">
              Trenutno ni prihajajočih dogodkov. Spremljajte našo stran!
            </p>
          </div>
        )}

        <div className="text-center mt-12 animate-fade-in">
          <Link href="/dogodki" className="btn-secondary text-lg px-8 py-4">
            Vsi dogodki
          </Link>
        </div>
      </div>
    </section>
  )
}