import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    message: 'Hello from the Next.js API route!',
    data: {
      timestamp: new Date().toISOString(),
    },
  });
} 