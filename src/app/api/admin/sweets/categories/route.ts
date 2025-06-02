import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { sweetsCategories } from '@/db/schema';

export async function GET() {
  try {
    const categories = await db.select().from(sweetsCategories);
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching sweets categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sweets categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, isActive } = body;

    const newCategory = await db.insert(sweetsCategories).values({
      name,
      description,
      isActive,
    }).returning();

    return NextResponse.json(newCategory[0]);
  } catch (error) {
    console.error('Error creating sweets category:', error);
    return NextResponse.json(
      { error: 'Failed to create sweets category' },
      { status: 500 }
    );
  }
}