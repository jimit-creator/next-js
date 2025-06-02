import { NextResponse } from 'next/server';
import { db } from '@/db';
import { foodCategories } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const categories = await db.select().from(foodCategories).where(eq(foodCategories.isActive, true));
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching food categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch food categories' },
      { status: 500 }
    );
  }
}