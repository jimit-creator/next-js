import { NextResponse } from 'next/server';
import { db } from '@/db/index';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { generateToken, verifyPassword } from '@/utils/auth';

/**
 * Handles user authentication via a POST request.
 * 
 * @param {Request} request - The HTTP request object containing user credentials (username and password).
 * @returns {Promise<NextResponse>} - A response indicating whether authentication was successful or not.
 */
export async function POST(request: Request): Promise<NextResponse> {
  // Extract username and password from the request body
  const { username, password } = await request.json();

  // Retrieve the user from the database based on the provided username
  const user = await db.query.users.findFirst({
    where: eq(users.username, username)
  });

  // Validate user credentials
  if (!user || !(await verifyPassword(password, user.password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // If authentication is successful, generate a JWT token
  const token = await generateToken({ id: user.id, username: user.username });
  // Return the token in the response
  return NextResponse.json({ message: 'Login successful', token });
}
