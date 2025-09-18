import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { getISOWeek } from 'date-fns';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Weekly refresh endpoint for PPV Flashback features
 * Should be called every Sunday at midnight to refresh weekly content
 */
export async function POST(request: NextRequest) {
  try {
    // Verify this is being called from a trusted source
    const authHeader = request.headers.get('authorization');
    const expectedAuth = `Bearer ${process.env.WEEKLY_REFRESH_TOKEN}`;
    
    if (process.env.WEEKLY_REFRESH_TOKEN && authHeader !== expectedAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();
    console.log(`[Weekly Refresh] Starting weekly refresh for week of ${now.toDateString()}`);

    // Revalidate all PPV Flashback related paths
    const pathsToRevalidate = [
      '/ppv-flashback',
      '/api/events/ppv-flashback',
      '/api/events/wwe-flashback', 
      '/api/events/ufc-flashback',
      '/', // Homepage that includes PPVFlashbackSection
    ];

    // Revalidate all paths
    for (const path of pathsToRevalidate) {
      try {
        revalidatePath(path);
        console.log(`[Weekly Refresh] ✅ Revalidated ${path}`);
      } catch (error) {
        console.error(`[Weekly Refresh] ❌ Failed to revalidate ${path}:`, error);
      }
    }

    // Also try to revalidate by tag if we had tags set up
    try {
      revalidateTag('ppv-flashback');
      console.log(`[Weekly Refresh] ✅ Revalidated ppv-flashback tag`);
    } catch (error) {
      console.log(`[Weekly Refresh] Tag revalidation not available`);
    }

    console.log(`[Weekly Refresh] ✅ Weekly refresh completed successfully`);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      message: 'Weekly PPV Flashback refresh completed successfully',
      revalidatedPaths: pathsToRevalidate,
      weekNumber: getISOWeek(new Date())
    });

  } catch (error) {
    console.error('[Weekly Refresh] ❌ Weekly refresh failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// Also support GET for testing
export async function GET() {
  const now = new Date();
  const currentWeek = now.toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  return NextResponse.json({
    currentTime: now.toISOString(),
    currentWeek,
    weekNumber: getISOWeek(now),
    message: 'Weekly PPV Flashback refresh endpoint is operational',
    instructions: 'Use POST with Authorization header to trigger refresh'
  });
}