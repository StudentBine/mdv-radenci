import { notFound } from 'next/navigation'
import Link from 'next/link'
import { db } from '@/lib/db'
import { news, users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface NewsPageProps {
  params: {
    slug: string
  }
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
  // Fetch news from database by slug with author information
  const result = await db
    .select({
      id: news.id,
      title: news.title,
      slug: news.slug,
      excerpt: news.excerpt,
      content: news.content,
      imageUrl: news.imageUrl,
      published: news.published,
      publishedAt: news.publishedAt,
      createdAt: news.createdAt,
      authorId: news.authorId,
      authorName: users.name,
    })
    .from(news)
    .leftJoin(users, eq(news.authorId, users.id))
    .where(eq(news.slug, params.slug))
    .limit(1)

  const newsItem = result[0]

  if (!newsItem || !newsItem.published) {
    notFound()
  }

  const formatDate = (date: Date | null) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('sl-SI', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  // Calculate read time (estimate: 200 words per minute)
  const calculateReadTime = (content: string) => {
    const words = content.split(/\s+/).length
    const minutes = Math.ceil(words / 200)
    return `${minutes} min`
  }

  const displayDate = newsItem.publishedAt || newsItem.createdAt

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation */}
      <section className="bg-primary-white border-b border-gray-200">
        <div className="container-custom py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary-green transition-colors duration-200">
              Domov
            </Link>
            <span>›</span>
            <Link href="/novice" className="hover:text-primary-green transition-colors duration-200">
              Novice
            </Link>
            <span>›</span>
            <span className="text-gray-900">{newsItem.title}</span>
          </nav>
        </div>
      </section>

      {/* Article */}
      <article className="section-padding">
        <div className="container-custom max-w-4xl">
          {/* Header */}
          <header className="text-center mb-12 animate-fade-in">
            <div className="inline-block bg-primary-green text-primary-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              Novica
            </div>
            <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6 leading-tight">
              {newsItem.title}
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-yellow rounded-full flex items-center justify-center">
                  <span className="text-gray-900 text-sm font-medium">
                    {newsItem.authorName ? newsItem.authorName.charAt(0).toUpperCase() : 'A'}
                  </span>
                </div>
                <span>{newsItem.authorName || 'Admin'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(displayDate)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{calculateReadTime(newsItem.content)} branja</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-12 rounded-2xl overflow-hidden shadow-xl animate-slide-up">
            {newsItem.imageUrl ? (
              <img
                src={newsItem.imageUrl}
                alt={newsItem.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            ) : (
              <div className="w-full h-64 md:h-96 bg-gradient-to-br from-primary-green to-primary-yellow flex items-center justify-center">
                <span className="text-primary-white font-heading font-bold text-2xl">MDV - {newsItem.title}</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-a:text-primary-green prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-md animate-fade-in"
            dangerouslySetInnerHTML={{ __html: newsItem.content }}
          />

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-gray-200 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-gray-600 font-medium">Delite to novico:</p>
              </div>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-blue-600 text-primary-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200">
                  <span className="text-sm font-medium">f</span>
                </button>
                <button className="w-10 h-10 bg-blue-400 text-primary-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors duration-200">
                  <span className="text-sm font-medium">t</span>
                </button>
                <button className="w-10 h-10 bg-green-500 text-primary-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-200">
                  <span className="text-sm font-medium">in</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}