import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// Manual cache revalidation endpoint
// Usage: POST /api/revalidate?token=YOUR_TOKEN&paths=/,/novice
export async function POST(request: NextRequest) {
  try {
    // Simple token check for security
    const token = request.nextUrl.searchParams.get('token');
    const paths = request.nextUrl.searchParams.get('paths');

    // Check if token is provided (add proper token validation in production)
    if (!token || token !== process.env.REVALIDATE_TOKEN) {
      return NextResponse.json(
        { error: 'Invalid or missing token' },
        { status: 401 }
      );
    }

    if (!paths) {
      return NextResponse.json(
        { error: 'paths parameter is required' },
        { status: 400 }
      );
    }

    // Parse paths and revalidate each one
    const pathsList = paths.split(',').map((p) => p.trim());
    
    for (const path of pathsList) {
      revalidatePath(path);
    }

    return NextResponse.json({
      success: true,
      message: `Revalidated ${pathsList.length} paths`,
      paths: pathsList
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Revalidation failed' },
      { status: 500 }
    );
  }
}
