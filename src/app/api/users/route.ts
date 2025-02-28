import { NextResponse } from 'next/server';
import { db } from '@/db/index';

export async function GET(request: Request) {
  try {
    const userList = await db.query.users.findMany(); // Fetch users from the database
    return NextResponse.json(userList);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}