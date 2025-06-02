import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { otpVerifications, users } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { generateToken } from '@/utils/auth';

export async function POST(request: NextRequest) {
  try {
    const { mobile, otp } = await request.json();

    if (!mobile || !otp) {
      return NextResponse.json(
        { error: 'Mobile number and OTP are required' },
        { status: 400 }
      );
    }

    // Find the OTP record
    const otpRecord = await db
      .select()
      .from(otpVerifications)
      .where(
        and(
          eq(otpVerifications.mobile, mobile),
          eq(otpVerifications.otp, otp),
          eq(otpVerifications.isVerified, false)
        )
      )
      .limit(1);

    if (otpRecord.length === 0) {
      return NextResponse.json(
        { error: 'Invalid OTP' },
        { status: 400 }
      );
    }

    const record = otpRecord[0];

    // Check if OTP has expired
    if (new Date() > record.expiresAt) {
      return NextResponse.json(
        { error: 'OTP has expired' },
        { status: 400 }
      );
    }

    // Mark OTP as verified
    await db
      .update(otpVerifications)
      .set({ isVerified: true })
      .where(eq(otpVerifications.id, record.id));

    // Check if user exists, if not create one
    let user = await db
      .select()
      .from(users)
      .where(eq(users.mobile, mobile))
      .limit(1);

    if (user.length === 0) {
      // Create new customer user
      const newUser = await db
        .insert(users)
        .values({
          mobile,
          role: 'customer',
          isActive: true,
        })
        .returning();
      
      user = newUser;
    }

    // Generate JWT token
    const token = await generateToken({ 
      userId: user[0].id, 
      mobile: user[0].mobile,
      role: user[0].role 
    });

    return NextResponse.json({
      message: 'OTP verified successfully',
      token,
      user: {
        id: user[0].id,
        mobile: user[0].mobile,
        name: user[0].name,
        email: user[0].email,
        role: user[0].role,
      }
    });

  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    );
  }
}