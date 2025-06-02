// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/db/index';
import { users } from '@/db/schema';
import { asc, desc, like, sql } from 'drizzle-orm';

type SortableFields = 'username' | 'createdAt'; // Define valid sortable fields

export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);
  const search = url.searchParams.get('search') || ''; // Get search query
  const sort = (url.searchParams.get('sort') as SortableFields) || 'username'; // Default sort field
  const order = url.searchParams.get('order') || 'asc'; // Default order
  
  // Pagination parameters
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '10');
  const offset = (page - 1) * limit;

  try {
    // Build the query with pagination
    const query = db.query.users.findMany({
      where: search ? like(users.username, `%${search}%`) : undefined, // Filter by username if search is provided
      orderBy: order === 'asc' ? asc(users[sort]) : desc(users[sort]),
      limit: limit,
      offset: offset,
    });

    // Get total count for pagination metadata
    const countQuery = db.select({ count: sql`count(*)` }).from(users)
      .where(search ? like(users.username, `%${search}%`) : undefined);
    
    // Execute both queries in parallel
    const [userList, countResult] = await Promise.all([
      query,
      countQuery
    ]);

    const totalItems = Number(countResult[0].count);
    const totalPages = Math.ceil(totalItems / limit);

    return NextResponse.json({
      data: userList,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}