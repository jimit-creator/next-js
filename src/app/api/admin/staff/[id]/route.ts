import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { hash } from '@/utils/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { username, password, name, email, mobile, role, isActive } = body;
    const resolvedParams = await params;
    const userId = parseInt(resolvedParams.id);

    const updateData: any = {
      username,
      name,
      email,
      mobile,
      role,
      isActive,
      updatedAt: new Date(),
    };

    // Only update password if provided
    if (password) {
      updateData.password = await hash(password);
    }

    const updatedStaff = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, userId))
      .returning();

    // Don't return password in response
    const { password: _, ...staffWithoutPassword } = updatedStaff[0];
    return NextResponse.json(staffWithoutPassword);
  } catch (error) {
    console.error('Error updating staff:', error);
    return NextResponse.json(
      { error: 'Failed to update staff member' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const userId = parseInt(resolvedParams.id);

    await db.delete(users).where(eq(users.id, userId));

    return NextResponse.json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    console.error('Error deleting staff:', error);
    return NextResponse.json(
      { error: 'Failed to delete staff member' },
      { status: 500 }
    );
  }
}