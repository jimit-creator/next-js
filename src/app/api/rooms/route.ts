import { NextResponse } from 'next/server';
import { db } from '@/db';
import { rooms } from '@/db/schema';

export async function GET() {
  try {
    const allRooms = await db.select().from(rooms);
    return NextResponse.json(allRooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rooms' },
      { status: 500 }
    );
  }
}