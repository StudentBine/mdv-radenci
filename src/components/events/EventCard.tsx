import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import type { Event } from '@/lib/db/schema';
import { Calendar, MapPin } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Link href={`/dogodki/${event.slug}`}>
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        {event.imageUrl && (
          <div className="relative h-48">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Calendar size={16} />
            <time>{formatDate(event.eventDate)}</time>
          </div>
          
          {event.location && (
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <MapPin size={16} />
              <span>{event.location}</span>
            </div>
          )}
          
          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
          {event.description && (
            <p className="text-gray-600 line-clamp-3">{event.description}</p>
          )}
        </div>
      </article>
    </Link>
  );
}
