import { NextRequest, NextResponse } from 'next/server';
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
      .leftJoin(foodCategories, eq(foodItems.categoryId, foodCategories.id));

    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching food items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch food items' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, unit, categoryId, isAvailable } = body;

    const newItem = await db.insert(foodItems).values({
      name,
      description,
      price,
      unit,
      categoryId: parseInt(categoryId),
      isAvailable,
    }).returning();

    return NextResponse.json(newItem[0]);
  } catch (error) {
    console.error('Error creating food item:', error);
    return NextResponse.json(
      { error: 'Failed to create food item' },
      { status: 500 }
    );
  }
}