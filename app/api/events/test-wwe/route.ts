import { NextResponse } from 'next/server';

export async function GET() {
  console.log('[WWE Flashback Test] API called');
  
  return NextResponse.json({
    message: 'WWE Flashback API test',
    timestamp: new Date().toISOString(),
    context: {
      totalMatchingEvents: 2,
      yearsAgo: 22,
      alternativeEvents: [
        {
          name: 'Test Event 1',
          promotion: { name: 'WWE' },
          date: '2002-09-22',
          attendance: 16000
        }
      ]
    },
    event: {
      name: 'Unforgiven 2002',
      promotion: { name: 'World Wrestling Entertainment' },
      date: '2002-09-22',
      venue: 'Staples Center, Los Angeles, California',
      attendance: 16000,
      headliners: ['The Undertaker', 'Brock Lesnar'],
      titleChanges: ['WWE Championship: The Undertaker defeats Brock Lesnar']
    }
  });
}