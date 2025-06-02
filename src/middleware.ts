import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // Use jose instead of jsonwebtoken

export async function middleware(request: Request) {

  // Convert headers to a more readable format
  const headers = Object.fromEntries(request.headers.entries());
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

  // Check if the token is present
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized - No token provided' }, { status: 401 });
  }

  // Get JWT secret from environment variable
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

  try {
    // Verify the token with jose library instead of jsonwebtoken
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    // If the token is valid, allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json({ error: 'Unauthorized - Invalid token' }, { status: 401 });
  }
}

// Specify the paths where this middleware should apply
export const config = {
  matcher: ['/api/users']
};