import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

export const hash = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10); // Generate a salt
  return await bcrypt.hash(password, salt); // Hash the password
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword); // Compare the password with the hashed password
};



export async function generateToken(payload: any, expiresIn: string = '24h') {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  
  // Create a new JWT token
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(new TextEncoder().encode(secret));
  
  return token;
}