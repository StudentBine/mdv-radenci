import { db } from '@/lib/db';
import { news, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

export default async function NewsPage({ params }: { params: { slug: string } }) {
  const [article] = await db.select()
    .from(news)
    .where(eq(news.slug, params.slug))
    .limit(1);

  if (!article || !article.published) {
    notFound();
  }

  // Fetch author if authorId exists
  let author = null;
  if (article.authorId) {
    const [authorData] = await db.select()
      .from(users)
      .where(eq(users.id, article.authorId))
      .limit(1);
    author = authorData;
  }

  return (
    <article className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        {article.imageUrl && (
          <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        
        <div className="flex items-center gap-4 text-gray-600 mb-8">
          {author && (
            <span>Avtor: {author.name}</span>
          )}
          <time dateTime={article.publishedAt?.toISOString()}>
            {formatDate(article.publishedAt!)}
          </time>
        </div>

        <div 
          className="prose prose-lg max-w-none whitespace-pre-wrap"
        >
          {article.content}
        </div>
      </div>
    </article>
  );
}
