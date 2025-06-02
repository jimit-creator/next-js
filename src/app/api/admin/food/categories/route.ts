import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { foodCategories } from '@/db/schema';

export async function GET() {
  try {
    const categories = await db.select().from(foodCategories);
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching food categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch food categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, isActive } = body;

    const newCategory = await db.insert(foodCategories).values({
      name,
      description,
      isActive,
    }).returning();

    return NextResponse.json(newCategory[0]);
  } catch (error) {
    console.error('Error creating food category:', error);
    return NextResponse.json(
      { error: 'Failed to create food category' },
      { status: 500 }
    );
  }
}