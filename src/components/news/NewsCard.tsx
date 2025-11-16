import Link from 'next/link'
import { News } from '@/lib/db/schema'

interface NewsCardProps {
  news: News
  className?: string
  style?: React.CSSProperties
}

export default function NewsCard({ news, className = '', style }: NewsCardProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('sl-SI', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <article className={`card overflow-hidden group hover:translate-y-[-4px] transition-all duration-300 ${className}`} style={style}>
      <Link href={`/novice/${news.slug}`}>
        {/* Image */}
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          <div className="absolute inset-0 bg-primary-green opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10"></div>
          {news.imageUrl ? (
            <img 
              src={news.imageUrl} 
              alt={news.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-green to-primary-yellow flex items-center justify-center">
              <span className="text-primary-white font-heading font-bold text-lg">MDV</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(news.publishedAt || news.createdAt)}
          </div>

          <h3 className="font-heading font-semibold text-xl mb-3 text-gray-900 group-hover:text-primary-green transition-colors duration-300 line-clamp-2">
            {news.title}
          </h3>

          {news.excerpt && (
            <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
              {news.excerpt}
            </p>
          )}

          <div className="flex items-center text-primary-green font-medium group-hover:text-green-600 transition-colors duration-300">
            Preberi več
            <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  )
}