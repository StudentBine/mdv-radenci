import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { news } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
import { slugify } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET - Pridobi vse novice
export async function GET() {
  try {
    const allNews = await db.select().from(news).orderBy(desc(news.createdAt));
    return NextResponse.json(allNews);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

// POST - Ustvari novo novico
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Generiraj slug če ni podan
    if (!body.slug && body.title) {
      body.slug = slugify(body.title);
    }
    
    // Nastavi datum objave če je published
    if (body.published && !body.publishedAt) {
      body.publishedAt = new Date();
    }
    
    const newArticle = await db.insert(news).values({
      ...body,
      authorId: 1, // TODO: use actual user ID from session
    }).returning();
    
    return NextResponse.json(newArticle[0]);
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json(
      { error: 'Failed to create news' },
      { status: 500 }
    );
  }
}
