import { NextResponse } from 'next/server';
import { db } from '@/db';
import { foodItems, foodCategories } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const items = await db
      .select({
        id: foodItems.id,
        categoryId: foodItems.categoryId,
        name: foodItems.name,
        description: foodItems.description,
        price: foodItems.price,
        unit: foodItems.unit,
        image: foodItems.image,
        isAvailable: foodItems.isAvailable,
        category: {
          id: foodCategories.id,
          name: foodCategories.name,
          description: foodCategories.description,
          isActive: foodCategories.isActive,
        }
      })
      .from(foodItems)
      .leftJoin(foodCategories, eq(foodItems.categoryId, foodCategories.id))
      .where(eq(foodItems.isAvailable, true));

    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching food items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch food items' },
      { status: 500 }
    );
  }
}