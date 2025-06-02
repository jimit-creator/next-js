import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { otpVerifications } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const { mobile } = await request.json();

    if (!mobile) {
      return NextResponse.json(
        { error: 'Mobile number is required' },
        { status: 400 }
      );
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiry time (5 minutes from now)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Clean up any existing OTPs for this mobile number
    await db.delete(otpVerifications).where(eq(otpVerifications.mobile, mobile));

    // Store the OTP in database
    await db.insert(otpVerifications).values({
      mobile,
      otp,
      expiresAt,
      isVerified: false,
    });

    // In a real application, you would send the OTP via SMS using Twilio
    // For demo purposes, we'll return the OTP in the response
    console.log(`OTP for ${mobile}: ${otp}`);

    // TODO: Implement actual SMS sending with Twilio
    // const twilioService = new TwilioService();
    // await twilioService.sendSMS(mobile, `Your Grand Hotel verification code is: ${otp}`);

    return NextResponse.json({ 
      message: 'OTP sent successfully',
      // In production, remove this debug info
      debug: `OTP: ${otp} (for demo purposes)` 
    });

  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}