import { db } from '@/lib/db'
import { news, users } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'
import Link from 'next/link'
import DeleteNewsButton from '@/components/admin/DeleteNewsButton'
import NewsFilters from '@/components/admin/NewsFilters'
import PublishToggle from '@/components/admin/PublishToggle'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function AdminNewsPage({
  searchParams,
}: {
  searchParams: { search?: string; status?: string }
}) {
  const searchTerm = searchParams.search || ''
  const statusFilter = searchParams.status || ''

  // Fetch news with author information
  const query = db
    .select({
      id: news.id,
      title: news.title,
      slug: news.slug,
      published: news.published,
      publishedAt: news.publishedAt,
      createdAt: news.createdAt,
      authorId: news.authorId,
      authorName: users.name,
    })
    .from(news)
    .leftJoin(users, eq(news.authorId, users.id))
    .orderBy(desc(news.createdAt))

  const allNews = await query

  // Filter by search term
  let filteredNews = allNews
  if (searchTerm) {
    filteredNews = allNews.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.authorName && item.authorName.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  }

  // Filter by status
  if (statusFilter === 'published') {
    filteredNews = filteredNews.filter((item) => item.published)
  } else if (statusFilter === 'draft') {
    filteredNews = filteredNews.filter((item) => !item.published)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900">
            Upravljanje novic
          </h1>
          <p className="text-gray-600 mt-2">
            Ustvarjajte, urejajte in upravljajte novice na spletni strani
          </p>
        </div>
        <Link
          href="/admin/novice/nova"
          className="btn-primary flex items-center space-x-2"
        >
          <span>+</span>
          <span>Nova novica</span>
        </Link>
      </div>

      {/* Search and Filters */}
      <NewsFilters searchTerm={searchTerm} statusFilter={statusFilter} />

      {/* News Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Naslov
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avtor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Datum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcije
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredNews.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {item.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.authorName || 'Neznano'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {item.publishedAt
                        ? new Date(item.publishedAt).toLocaleDateString('sl-SI')
                        : new Date(item.createdAt).toLocaleDateString('sl-SI')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <PublishToggle
                      newsId={item.id}
                      isPublished={item.published}
                      newsTitle={item.title}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/novice/${item.id}`}
                        className="text-primary-green hover:text-green-600 transition-colors duration-200"
                      >
                        Uredi
                      </Link>
                      <DeleteNewsButton newsId={item.id} newsTitle={item.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📰</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Ni novic
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'Ni novic, ki ustrezajo iskanju.' : 'Še nimate nobenih novic.'}
            </p>
            <Link
              href="/admin/novice/nova"
              className="btn-primary"
            >
              Ustvari prvo novico
            </Link>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="flex justify-between items-center text-sm text-gray-700">
        <div>
          Skupaj <span className="font-medium">{filteredNews.length}</span> {filteredNews.length === 1 ? 'novica' : filteredNews.length === 2 ? 'novici' : filteredNews.length === 3 || filteredNews.length === 4 ? 'novice' : 'novic'}
        </div>
      </div>
    </div>
  )
}