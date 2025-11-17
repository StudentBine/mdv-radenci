import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { news, users } from '@/lib/db/schema';
import { desc, eq } from 'drizzle-orm';
import { slugify } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

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
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user ID from session - if no ID, lookup by email
    let userId = parseInt(session.user.id || '0');
    
    if (!userId && session.user.email) {
      const user = await db.query.users.findFirst({
        where: eq(users.email, session.user.email),
      });
      
      if (user) {
        userId = user.id;
      }
    }
    
    // Fallback to admin if still no user found
    if (!userId) {
      userId = 1;
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
      authorId: userId,
    }).returning();
    
    // Revalidate cache for all relevant pages
    revalidatePath('/admin/novice');
    if (body.published) {
      revalidatePath('/');
      revalidatePath('/novice');
    }
    
    return NextResponse.json(newArticle[0]);
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json(
      { error: 'Failed to create news' },
      { status: 500 }
    );
  }
}
