import { Event } from '@/lib/db/schema'

interface EventCardProps {
  event: Event
  className?: string
  style?: React.CSSProperties
}

export default function EventCard({ event, className = '', style }: EventCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('sl-SI', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('sl-SI', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className={`card bg-primary-white/10 backdrop-blur-sm border-white/20 text-primary-white group hover:bg-white/20 transition-all duration-300 ${className}`} style={style}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg bg-primary-yellow flex items-center justify-center text-lg">
              📅
            </div>
            <div>
              <h3 className="font-heading font-semibold text-xl group-hover:text-primary-yellow transition-colors duration-300">
                {event.title}
              </h3>
              {event.location && (
                <div className="flex items-center text-green-100 text-sm mt-1">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Date and Time */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center text-green-100">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(event.eventDate)}
          </div>
          <div className="flex items-center text-green-100">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatTime(event.eventDate)}
          </div>
        </div>

        {/* Description */}
        {event.description && (
          <p className="text-green-100 leading-relaxed mb-6 line-clamp-3">
            {event.description}
          </p>
        )}

        {/* Action */}
        <button className="w-full bg-primary-yellow text-gray-900 font-medium py-3 rounded-lg hover:bg-yellow-400 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:ring-offset-2 focus:ring-offset-green-600">
          Več informacij
        </button>
      </div>
    </div>
  )
}