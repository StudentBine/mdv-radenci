import Link from 'next/link'
import NewsCard from '../news/NewsCard'
import { db } from '@/lib/db'
import { news } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'

export default async function NewsSection() {
  // Fetch latest 3 published news from database
  const latestNews = await db.select()
    .from(news)
    .where(eq(news.published, true))
    .orderBy(desc(news.publishedAt))
    .limit(3)

  return (
    <section className="section-padding bg-primary-white">
      <div className="container-custom">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-gray-900">
            Zadnje{' '}
            <span className="text-primary-green">novice</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Spremljajte naše najnovejše dogodke, projekte in dosežke
          </p>
        </div>

        {latestNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {latestNews.map((newsItem, index) => (
              <NewsCard 
                key={newsItem.id}
                news={newsItem}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 opacity-50">📰</div>
            <p className="text-xl text-gray-600">
              Trenutno ni objavljenih novic. Kmalu dodamo nove vsebine!
            </p>
          </div>
        )}

        <div className="text-center animate-fade-in">
          <Link href="/novice" className="btn-outline inline-flex items-center">
            Vse novice
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}