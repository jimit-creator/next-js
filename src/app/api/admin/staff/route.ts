import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq, or } from 'drizzle-orm';
import { hash } from '@/utils/auth';

export async function GET() {
  try {
    const staff = await db
      .select()
      .from(users)
      .where(or(eq(users.role, 'admin'), eq(users.role, 'staff')));
    
    return NextResponse.json(staff);
  } catch (error) {
    console.error('Error fetching staff:', error);
    return NextResponse.json(
      { error: 'Failed to fetch staff' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, name, email, mobile, role, isActive } = body;

    const hashedPassword = await hash(password);

    const newStaff = await db.insert(users).values({
      username,
      password: hashedPassword,
      name,
      email,
      mobile,
      role,
      isActive,
    }).returning();

    // Don't return password in response
    const { password: _, ...staffWithoutPassword } = newStaff[0];
    return NextResponse.json(staffWithoutPassword);
  } catch (error) {
    console.error('Error creating staff:', error);
    return NextResponse.json(
      { error: 'Failed to create staff member' },
      { status: 500 }
    );
  }
}