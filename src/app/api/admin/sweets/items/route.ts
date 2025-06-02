import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { sweetsItems, sweetsCategories } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const items = await db
      .select({
        id: sweetsItems.id,
        categoryId: sweetsItems.categoryId,
        name: sweetsItems.name,
        description: sweetsItems.description,
        pricePerKg: sweetsItems.pricePerKg,
        image: sweetsItems.image,
        isAvailable: sweetsItems.isAvailable,
        category: {
          id: sweetsCategories.id,
          name: sweetsCategories.name,
          description: sweetsCategories.description,
          isActive: sweetsCategories.isActive,
        }
      })
      .from(sweetsItems)
      .leftJoin(sweetsCategories, eq(sweetsItems.categoryId, sweetsCategories.id));

    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching sweets items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sweets items' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, pricePerKg, categoryId, isAvailable } = body;

    const newItem = await db.insert(sweetsItems).values({
      name,
      description,
      pricePerKg,
      categoryId: parseInt(categoryId),
      isAvailable,
    }).returning();

    return NextResponse.json(newItem[0]);
  } catch (error) {
    console.error('Error creating sweets item:', error);
    return NextResponse.json(
      { error: 'Failed to create sweets item' },
      { status: 500 }
    );
  }
}