import { db } from '@/lib/db'
import { news } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'
import NewsCard from '@/components/news/NewsCard'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function NewsPage() {
  // Fetch published news from database
  const allNews = await db
    .select()
    .from(news)
    .where(eq(news.published, true))
    .orderBy(desc(news.publishedAt))
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-green to-green-600 text-primary-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
              Novice
            </h1>
            <p className="text-xl md:text-2xl text-green-100 leading-relaxed">
              Spremljajte naše najnovejše dogodke, projekte in dosežke
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allNews.length > 0 ? (
              allNews.map((newsItem, index) => (
                <NewsCard 
                  key={newsItem.id}
                  news={newsItem}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 text-lg">Trenutno ni objavljenih novic.</p>
              </div>
            )}
          </div>

          {/* Load More */}
          <div className="text-center mt-12 animate-fade-in">
            <button className="btn-outline px-8 py-4">
              Naloži več novic
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}