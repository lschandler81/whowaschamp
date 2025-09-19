import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { prisma, DATABASE_URL } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const cwd = process.cwd();
    const dbPath = path.join(cwd, 'dev.db');
    const dbExists = fs.existsSync(dbPath);
    const dbSize = dbExists ? fs.statSync(dbPath).size : 0;
    const publicProfilesPath = path.join(cwd, 'public', 'data', 'profiles.json');
    const publicProfilesExists = fs.existsSync(publicProfilesPath);
    const bundledProfilesSize = publicProfilesExists ? fs.statSync(publicProfilesPath).size : 0;

    let prismaOk = false;
    let profileCount = 0;
    try {
      profileCount = await prisma.profile.count();
      prismaOk = true;
    } catch (e) {
      prismaOk = false;
    }

    return NextResponse.json({
      cwd,
      database: {
        url: DATABASE_URL,
        exists: dbExists,
        size: dbSize,
      },
      profilesJson: {
        bundledExists: publicProfilesExists,
        bundledSize: bundledProfilesSize,
        remoteUrl: (process.env.URL || process.env.NETLIFY_URL || process.env.NEXT_PUBLIC_APP_URL || '')
          .replace(/\/$/, '') + '/data/profiles.json'
      },
      prisma: {
        ok: prismaOk,
        profileCount,
      },
      env: {
        NODE_ENV: process.env.NODE_ENV,
        URL: process.env.URL,
        NETLIFY_URL: process.env.NETLIFY_URL,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        NETLIFY: process.env.NETLIFY,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

