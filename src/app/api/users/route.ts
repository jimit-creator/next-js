// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/db/index';
import { users } from '@/db/schema';
import { asc, desc, like } from 'drizzle-orm';

type SortableFields = 'username' | 'createdAt'; // Define valid sortable fields

export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);
  const search = url.searchParams.get('search') || ''; // Get search query
  const sort = (url.searchParams.get('sort') as SortableFields) || 'username'; // Default sort field
  const order = url.searchParams.get('order') || 'asc'; // Default order

  try {
    // Build the query
    const query = db.query.users.findMany({
      where: search ? like(users.username, `%${search}%`) : undefined, // Filter by username if search is provided
      orderBy: order === 'asc' ? asc(users[sort]) : desc(users[sort]), 
    });

    const userList = await query; // Fetch users from the database
    return NextResponse.json(userList);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}