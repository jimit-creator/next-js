import { db } from './index';
import { 
  users, 
  rooms, 
  foodCategories, 
  foodItems, 
  sweetsCategories, 
  sweetsItems,
  discountCoupons 
} from './schema';
import { hash } from '../utils/auth';

async function seed() {
  console.log('Starting database seeding...');

  try {
    // Create admin user
    const hashedAdminPassword = await hash('admin123');
    await db.insert(users).values({
      username: 'admin',
      password: hashedAdminPassword,
      role: 'admin',
      name: 'Hotel Admin',
      email: 'admin@hotel.com',
      mobile: '+1234567890',
      isActive: true,
    });

    // Create staff user
    const hashedStaffPassword = await hash('staff123');
    await db.insert(users).values({
      username: 'staff1',
      password: hashedStaffPassword,
      role: 'staff',
      name: 'Hotel Staff',
      email: 'staff@hotel.com',
      mobile: '+1234567891',
      isActive: true,
    });

    console.log('✓ Admin and staff users created');

    // Create rooms
    const roomsData = [
      // Premium rooms (5 rooms)
      { roomNumber: 'P101', roomType: 'premium', price: '150.00', description: 'Premium room with city view', amenities: '["WiFi", "AC", "TV", "Mini Bar"]' },
      { roomNumber: 'P102', roomType: 'premium', price: '150.00', description: 'Premium room with city view', amenities: '["WiFi", "AC", "TV", "Mini Bar"]' },
      { roomNumber: 'P103', roomType: 'premium', price: '150.00', description: 'Premium room with city view', amenities: '["WiFi", "AC", "TV", "Mini Bar"]' },
      { roomNumber: 'P104', roomType: 'premium', price: '150.00', description: 'Premium room with city view', amenities: '["WiFi", "AC", "TV", "Mini Bar"]' },
      { roomNumber: 'P105', roomType: 'premium', price: '150.00', description: 'Premium room with city view', amenities: '["WiFi", "AC", "TV", "Mini Bar"]' },
      
      // Deluxe rooms (5 rooms)
      { roomNumber: 'D201', roomType: 'deluxe', price: '250.00', description: 'Deluxe room with garden view', amenities: '["WiFi", "AC", "TV", "Mini Bar", "Balcony", "Room Service"]' },
      { roomNumber: 'D202', roomType: 'deluxe', price: '250.00', description: 'Deluxe room with garden view', amenities: '["WiFi", "AC", "TV", "Mini Bar", "Balcony", "Room Service"]' },
      { roomNumber: 'D203', roomType: 'deluxe', price: '250.00', description: 'Deluxe room with garden view', amenities: '["WiFi", "AC", "TV", "Mini Bar", "Balcony", "Room Service"]' },
      { roomNumber: 'D204', roomType: 'deluxe', price: '250.00', description: 'Deluxe room with garden view', amenities: '["WiFi", "AC", "TV", "Mini Bar", "Balcony", "Room Service"]' },
      { roomNumber: 'D205', roomType: 'deluxe', price: '250.00', description: 'Deluxe room with garden view', amenities: '["WiFi", "AC", "TV", "Mini Bar", "Balcony", "Room Service"]' },
      
      // Suite rooms (5 rooms)
      { roomNumber: 'S301', roomType: 'suite', price: '450.00', description: 'Luxury suite with ocean view', amenities: '["WiFi", "AC", "TV", "Mini Bar", "Balcony", "Room Service", "Jacuzzi", "Living Area"]' },
      { roomNumber: 'S302', roomType: 'suite', price: '450.00', description: 'Luxury suite with ocean view', amenities: '["WiFi", "AC", "TV", "Mini Bar", "Balcony", "Room Service", "Jacuzzi", "Living Area"]' },
      { roomNumber: 'S303', roomType: 'suite', price: '450.00', description: 'Luxury suite with ocean view', amenities: '["WiFi", "AC", "TV", "Mini Bar", "Balcony", "Room Service", "Jacuzzi", "Living Area"]' },
      { roomNumber: 'S304', roomType: 'suite', price: '450.00', description: 'Luxury suite with ocean view', amenities: '["WiFi", "AC", "TV", "Mini Bar", "Balcony", "Room Service", "Jacuzzi", "Living Area"]' },
      { roomNumber: 'S305', roomType: 'suite', price: '450.00', description: 'Luxury suite with ocean view', amenities: '["WiFi", "AC", "TV", "Mini Bar", "Balcony", "Room Service", "Jacuzzi", "Living Area"]' },
    ];

    for (const room of roomsData) {
      await db.insert(rooms).values(room as any);
    }

    console.log('✓ 15 hotel rooms created');

    // Create food categories
    const foodCategoriesData = [
      { name: 'Starters', description: 'Appetizers and light bites' },
      { name: 'Main Course', description: 'Primary dishes and meals' },
      { name: 'Drinks', description: 'Beverages and refreshments' },
      { name: 'Desserts', description: 'Sweet treats and desserts' },
      { name: 'Soups', description: 'Hot and cold soups' },
    ];

    const insertedFoodCategories = await db.insert(foodCategories).values(foodCategoriesData).returning();
    console.log('✓ Food categories created');

    // Create food items
    const foodItemsData = [
      // Starters
      { categoryId: insertedFoodCategories[0].id, name: 'Vegetable Samosa', description: 'Crispy pastries filled with spiced vegetables', price: '8.99', unit: '2 pieces' },
      { categoryId: insertedFoodCategories[0].id, name: 'Chicken Wings', description: 'Spicy grilled chicken wings', price: '12.99', unit: '6 pieces' },
      { categoryId: insertedFoodCategories[0].id, name: 'Paneer Tikka', description: 'Grilled cottage cheese with spices', price: '14.99', unit: '250g' },
      
      // Main Course
      { categoryId: insertedFoodCategories[1].id, name: 'Butter Chicken', description: 'Creamy tomato-based chicken curry', price: '18.99', unit: '300g' },
      { categoryId: insertedFoodCategories[1].id, name: 'Paneer Butter Masala', description: 'Rich cottage cheese curry', price: '16.99', unit: '250g' },
      { categoryId: insertedFoodCategories[1].id, name: 'Biryani (Chicken)', description: 'Aromatic basmati rice with spiced chicken', price: '22.99', unit: '1 portion' },
      { categoryId: insertedFoodCategories[1].id, name: 'Dal Makhani', description: 'Creamy black lentils', price: '13.99', unit: '250g' },
      
      // Drinks
      { categoryId: insertedFoodCategories[2].id, name: 'Masala Chai', description: 'Traditional spiced tea', price: '3.99', unit: '1 cup' },
      { categoryId: insertedFoodCategories[2].id, name: 'Fresh Lime Soda', description: 'Refreshing lime drink', price: '4.99', unit: '1 glass' },
      { categoryId: insertedFoodCategories[2].id, name: 'Mango Lassi', description: 'Sweet yogurt drink with mango', price: '6.99', unit: '1 glass' },
      
      // Desserts
      { categoryId: insertedFoodCategories[3].id, name: 'Gulab Jamun', description: 'Sweet milk dumplings in syrup', price: '7.99', unit: '2 pieces' },
      { categoryId: insertedFoodCategories[3].id, name: 'Kulfi', description: 'Traditional Indian ice cream', price: '5.99', unit: '1 piece' },
      
      // Soups
      { categoryId: insertedFoodCategories[4].id, name: 'Tomato Soup', description: 'Fresh tomato soup with herbs', price: '6.99', unit: '1 bowl' },
      { categoryId: insertedFoodCategories[4].id, name: 'Chicken Clear Soup', description: 'Light chicken broth with vegetables', price: '8.99', unit: '1 bowl' },
    ];

    await db.insert(foodItems).values(foodItemsData);
    console.log('✓ Food items created');

    // Create sweets categories
    const sweetsCategoriesData = [
      { name: 'Dry Sweets', description: 'Traditional dry Indian sweets' },
      { name: 'Wet Sweets', description: 'Syrup-based Indian sweets' },
      { name: 'Milk Sweets', description: 'Milk-based delicacies' },
      { name: 'Festival Specials', description: 'Special sweets for festivals' },
    ];

    const insertedSweetsCategories = await db.insert(sweetsCategories).values(sweetsCategoriesData).returning();
    console.log('✓ Sweets categories created');

    // Create sweets items
    const sweetsItemsData = [
      // Dry Sweets
      { categoryId: insertedSweetsCategories[0].id, name: 'Kaju Katli', description: 'Diamond-shaped cashew fudge', pricePerKg: '899.00' },
      { categoryId: insertedSweetsCategories[0].id, name: 'Besan Laddu', description: 'Traditional gram flour balls', pricePerKg: '499.00' },
      { categoryId: insertedSweetsCategories[0].id, name: 'Motichoor Laddu', description: 'Fine gram flour pearl sweets', pricePerKg: '549.00' },
      
      // Wet Sweets
      { categoryId: insertedSweetsCategories[1].id, name: 'Gulab Jamun', description: 'Milk dumplings in sugar syrup', pricePerKg: '449.00' },
      { categoryId: insertedSweetsCategories[1].id, name: 'Jalebi', description: 'Spiral-shaped crispy sweet in syrup', pricePerKg: '399.00' },
      { categoryId: insertedSweetsCategories[1].id, name: 'Rasgulla', description: 'Spongy cottage cheese balls in syrup', pricePerKg: '399.00' },
      
      // Milk Sweets
      { categoryId: insertedSweetsCategories[2].id, name: 'Rabri', description: 'Thick sweetened milk dessert', pricePerKg: '649.00' },
      { categoryId: insertedSweetsCategories[2].id, name: 'Kheer', description: 'Rice pudding with nuts', pricePerKg: '399.00' },
      { categoryId: insertedSweetsCategories[2].id, name: 'Malai Kulfi', description: 'Traditional frozen milk dessert', pricePerKg: '549.00' },
      
      // Festival Specials
      { categoryId: insertedSweetsCategories[3].id, name: 'Gujiya', description: 'Crescent-shaped sweet dumpling', pricePerKg: '599.00' },
      { categoryId: insertedSweetsCategories[3].id, name: 'Modak', description: 'Steamed sweet rice flour dumplings', pricePerKg: '549.00' },
    ];

    await db.insert(sweetsItems).values(sweetsItemsData);
    console.log('✓ Sweets items created');

    // Create discount coupons
    const discountCouponsData = [
      {
        code: 'WELCOME10',
        description: '10% off for new customers',
        discountType: 'percentage',
        discountValue: '10.00',
        minOrderAmount: '50.00',
        maxDiscountAmount: '20.00',
        validFrom: new Date(),
        validTo: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
        usageLimit: 100,
        isActive: true,
      },
      {
        code: 'ROOM20',
        description: '$20 off room bookings above $200',
        discountType: 'fixed',
        discountValue: '20.00',
        minOrderAmount: '200.00',
        validFrom: new Date(),
        validTo: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
        usageLimit: 50,
        isActive: true,
      },
    ];

    await db.insert(discountCoupons).values(discountCouponsData);
    console.log('✓ Discount coupons created');

    console.log('✅ Database seeding completed successfully!');
    console.log('\nLogin credentials:');
    console.log('Admin: username=admin, password=admin123');
    console.log('Staff: username=staff1, password=staff123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run the seed function
seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });