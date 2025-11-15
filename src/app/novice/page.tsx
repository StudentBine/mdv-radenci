import { db } from '@/lib/db';
import { news } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { NewsCard } from '@/components/news/NewsCard';

export default async function NewsListPage() {
  const allNews = await db.select()
    .from(news)
    .where(eq(news.published, true))
    .orderBy(desc(news.publishedAt));

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold mb-8">Novice</h1>
      
      {allNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allNews.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p>Trenutno ni objavljenih novic.</p>
        </div>
      )}
    </div>
  );
}
