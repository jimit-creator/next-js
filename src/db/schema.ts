import { pgTable, serial, text, timestamp, varchar, decimal, integer, boolean, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['admin', 'staff', 'customer']);
export const roomTypeEnum = pgEnum('room_type', ['premium', 'deluxe', 'suite']);
export const orderStatusEnum = pgEnum('order_status', ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled']);
export const paymentStatusEnum = pgEnum('payment_status', ['pending', 'paid', 'failed', 'refunded']);
export const paymentMethodEnum = pgEnum('payment_method', ['stripe', 'qr_code']);

// Users table (expanded for different roles)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username'),
  password: text('password'),
  role: userRoleEnum('role').notNull().default('customer'),
  mobile: varchar('mobile', { length: 15 }),
  email: text('email'),
  name: text('name'),
  address: text('address'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Rooms table
export const rooms = pgTable('rooms', {
  id: serial('id').primaryKey(),
  roomNumber: varchar('room_number', { length: 10 }).notNull().unique(),
  roomType: roomTypeEnum('room_type').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  description: text('description'),
  amenities: text('amenities'), // JSON string of amenities
  isAvailable: boolean('is_available').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Room bookings table
export const roomBookings = pgTable('room_bookings', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  roomId: integer('room_id').notNull(),
  checkIn: timestamp('check_in').notNull(),
  checkOut: timestamp('check_out').notNull(),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  discountAmount: decimal('discount_amount', { precision: 10, scale: 2 }).default('0'),
  finalAmount: decimal('final_amount', { precision: 10, scale: 2 }).notNull(),
  paymentStatus: paymentStatusEnum('payment_status').notNull().default('pending'),
  paymentMethod: paymentMethodEnum('payment_method'),
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  remarks: text('remarks'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Food categories table
export const foodCategories = pgTable('food_categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// Food items table
export const foodItems = pgTable('food_items', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  unit: text('unit').notNull().default('250g'), // e.g., 250g, 1 piece
  image: text('image'),
  isAvailable: boolean('is_available').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Sweets categories table
export const sweetsCategories = pgTable('sweets_categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// Sweets items table
export const sweetsItems = pgTable('sweets_items', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  pricePerKg: decimal('price_per_kg', { precision: 10, scale: 2 }).notNull(),
  image: text('image'),
  isAvailable: boolean('is_available').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Orders table (for food and sweets)
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  orderType: text('order_type').notNull(), // 'food' or 'sweets'
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  discountAmount: decimal('discount_amount', { precision: 10, scale: 2 }).default('0'),
  finalAmount: decimal('final_amount', { precision: 10, scale: 2 }).notNull(),
  status: orderStatusEnum('status').notNull().default('pending'),
  paymentStatus: paymentStatusEnum('payment_status').notNull().default('pending'),
  paymentMethod: paymentMethodEnum('payment_method'),
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  remarks: text('remarks'),
  deliveryAddress: text('delivery_address'),
  deliveryDate: timestamp('delivery_date'),
  trainNumber: text('train_number'),
  pnrNumber: text('pnr_number'),
  coachSeat: text('coach_seat'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Order items table
export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').notNull(),
  itemId: integer('item_id').notNull(),
  itemType: text('item_type').notNull(), // 'food' or 'sweets'
  quantity: integer('quantity').notNull(),
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
  unit: text('unit'), // For sweets: 250g, 500g, 1kg, etc.
  createdAt: timestamp('created_at').defaultNow(),
});

// Discount coupons table
export const discountCoupons = pgTable('discount_coupons', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  description: text('description'),
  discountType: text('discount_type').notNull(), // 'percentage' or 'fixed'
  discountValue: decimal('discount_value', { precision: 10, scale: 2 }).notNull(),
  minOrderAmount: decimal('min_order_amount', { precision: 10, scale: 2 }),
  maxDiscountAmount: decimal('max_discount_amount', { precision: 10, scale: 2 }),
  validFrom: timestamp('valid_from').notNull(),
  validTo: timestamp('valid_to').notNull(),
  usageLimit: integer('usage_limit'),
  usedCount: integer('used_count').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// OTP table for mobile verification
export const otpVerifications = pgTable('otp_verifications', {
  id: serial('id').primaryKey(),
  mobile: varchar('mobile', { length: 15 }).notNull(),
  otp: varchar('otp', { length: 6 }).notNull(),
  isVerified: boolean('is_verified').notNull().default(false),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  roomBookings: many(roomBookings),
  orders: many(orders),
}));

export const roomsRelations = relations(rooms, ({ many }) => ({
  bookings: many(roomBookings),
}));

export const roomBookingsRelations = relations(roomBookings, ({ one }) => ({
  user: one(users, {
    fields: [roomBookings.userId],
    references: [users.id],
  }),
  room: one(rooms, {
    fields: [roomBookings.roomId],
    references: [rooms.id],
  }),
}));

export const foodCategoriesRelations = relations(foodCategories, ({ many }) => ({
  items: many(foodItems),
}));

export const foodItemsRelations = relations(foodItems, ({ one, many }) => ({
  category: one(foodCategories, {
    fields: [foodItems.categoryId],
    references: [foodCategories.id],
  }),
  orderItems: many(orderItems),
}));

export const sweetsCategoriesRelations = relations(sweetsCategories, ({ many }) => ({
  items: many(sweetsItems),
}));

export const sweetsItemsRelations = relations(sweetsItems, ({ one, many }) => ({
  category: one(sweetsCategories, {
    fields: [sweetsItems.categoryId],
    references: [sweetsCategories.id],
  }),
  orderItems: many(orderItems),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
}));