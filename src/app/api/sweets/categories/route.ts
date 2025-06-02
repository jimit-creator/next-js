import { NextResponse } from 'next/server';
import { db } from '@/db';
import { sweetsCategories } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const categories = await db.select().from(sweetsCategories).where(eq(sweetsCategories.isActive, true));
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching sweets categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sweets categories' },
      { status: 500 }
    );
  }
}