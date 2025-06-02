import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { discountCoupons } from '@/db/schema';

export async function GET() {
  try {
    const coupons = await db.select().from(discountCoupons);
    return NextResponse.json(coupons);
  } catch (error) {
    console.error('Error fetching coupons:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coupons' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      code, 
      description, 
      discountType, 
      discountValue, 
      minOrderAmount, 
      maxDiscountAmount, 
      validFrom, 
      validTo, 
      usageLimit, 
      isActive 
    } = body;

    const newCoupon = await db.insert(discountCoupons).values({
      code,
      description,
      discountType,
      discountValue,
      minOrderAmount: minOrderAmount || null,
      maxDiscountAmount: maxDiscountAmount || null,
      validFrom: new Date(validFrom),
      validTo: new Date(validTo),
      usageLimit,
      usedCount: 0,
      isActive,
    }).returning();

    return NextResponse.json(newCoupon[0]);
  } catch (error) {
    console.error('Error creating coupon:', error);
    return NextResponse.json(
      { error: 'Failed to create coupon' },
      { status: 500 }
    );
  }
}