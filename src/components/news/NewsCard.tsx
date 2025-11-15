import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import type { News } from '@/lib/db/schema';

interface NewsCardProps {
  article: News;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <Link href={`/novice/${article.slug}`}>
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        {article.imageUrl && (
          <div className="relative h-48">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <div className="p-6">
          <time className="text-sm text-gray-500">
            {formatDate(article.publishedAt!)}
          </time>
          <h3 className="text-xl font-bold mt-2 mb-2">{article.title}</h3>
          {article.excerpt && (
            <p className="text-gray-600 line-clamp-3">{article.excerpt}</p>
          )}
        </div>
      </article>
    </Link>
  );
}
