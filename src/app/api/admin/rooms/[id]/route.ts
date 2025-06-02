import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { rooms } from '@/db/schema';
import { eq } from 'drizzle-orm';

type RouteContext = {
  params: {
    id: string;
  };
};

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const body = await request.json();
    const { roomNumber, roomType, price, description, amenities, isAvailable } = body;
    const roomId = parseInt(context.params.id);

    const updatedRoom = await db
      .update(rooms)
      .set({
        roomNumber,
        roomType,
        price,
        description,
        amenities,
        isAvailable,
        updatedAt: new Date(),
      })
      .where(eq(rooms.id, roomId))
      .returning();

    return NextResponse.json(updatedRoom[0]);
  } catch (error) {
    console.error('Error updating room:', error);
    return NextResponse.json(
      { error: 'Failed to update room' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const roomId = parseInt(context.params.id);

    await db.delete(rooms).where(eq(rooms.id, roomId));

    return NextResponse.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    return NextResponse.json(
      { error: 'Failed to delete room' },
      { status: 500 }
    );
  }
}