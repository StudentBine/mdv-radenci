import Link from 'next/link';
import { EventCard } from '@/components/events/EventCard';
import { db } from '@/lib/db';
import { events } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function EventsSection() {
  const upcomingEvents = await db.select()
    .from(events)
    .where(eq(events.published, true))
    .orderBy(events.eventDate)
    .limit(3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">Prihajajo dogodki</h2>
          <Link href="/dogodki" className="text-primary-600 hover:text-primary-700">
            Vsi dogodki →
          </Link>
        </div>

        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>Trenutno ni prihodnjih dogodkov. Spremljajte našo stran za nove dogodke!</p>
          </div>
        )}
      </div>
    </section>
  );
}
