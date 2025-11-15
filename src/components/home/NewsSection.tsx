import Link from 'next/link';
import { NewsCard } from '@/components/news/NewsCard';
import { db } from '@/lib/db';
import { news } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function NewsSection() {
  const latestNews = await db.select()
    .from(news)
    .where(eq(news.published, true))
    .orderBy(desc(news.publishedAt))
    .limit(3);

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">Najnovejše novice</h2>
          <Link href="/novice" className="text-primary-600 hover:text-primary-700">
            Vse novice →
          </Link>
        </div>

        {latestNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>Trenutno ni objavljenih novic. Kmalu bomo dodali nove vsebine!</p>
          </div>
        )}
      </div>
    </section>
  );
}
