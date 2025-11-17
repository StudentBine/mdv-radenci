import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { news } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { slugify } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

// GET - Pridobi posamezno novico
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const article = await db.query.news.findFirst({
      where: eq(news.id, parseInt(params.id)),
    });
    
    if (!article) {
      return NextResponse.json(
        { error: 'News not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(article);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

// PUT - Posodobi novico
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Posodobi slug če se spremeni naslov
    if (body.title && !body.slug) {
      body.slug = slugify(body.title);
    }
    
    // Nastavi datum objave če se objavi
    if (body.published && !body.publishedAt) {
      body.publishedAt = new Date();
    }
    
    const updated = await db
      .update(news)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(news.id, parseInt(params.id)))
      .returning();
    
    if (!updated.length) {
      return NextResponse.json(
        { error: 'News not found' },
        { status: 404 }
      );
    }

    // Revalidate cache for updated pages
    revalidatePath('/');
    revalidatePath('/novice');
    revalidatePath(`/novice/${updated[0].slug}`);
    
    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error('Error updating news:', error);
    return NextResponse.json(
      { error: 'Failed to update news' },
      { status: 500 }
    );
  }
}

// PATCH - Delno posodobi novico (za toggle published status)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Nastavi datum objave če se objavi
    if (body.published === true) {
      body.publishedAt = new Date();
    } else if (body.published === false) {
      body.publishedAt = null;
    }
    
    const updated = await db
      .update(news)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(news.id, parseInt(params.id)))
      .returning();
    
    if (!updated.length) {
      return NextResponse.json(
        { error: 'News not found' },
        { status: 404 }
      );
    }

    // Revalidate cache for updated pages
    revalidatePath('/');
    revalidatePath('/novice');
    revalidatePath('/admin/novice');
    if (updated[0].slug) {
      revalidatePath(`/novice/${updated[0].slug}`);
    }
    
    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error('Error updating news:', error);
    return NextResponse.json(
      { error: 'Failed to update news' },
      { status: 500 }
    );
  }
}

// DELETE - Izbriši novico
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await db.delete(news).where(eq(news.id, parseInt(params.id)));
    
    // Revalidate cache for home and news pages
    revalidatePath('/');
    revalidatePath('/novice');
    revalidatePath('/admin/novice');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json(
      { error: 'Failed to delete news' },
      { status: 500 }
    );
  }
}
