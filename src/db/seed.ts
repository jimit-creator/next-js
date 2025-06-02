import { db } from './index';
import { users } from './schema';
import { hash } from '@/utils/auth';

const seedUsers = async () => {
  const userData = [
    { username: 'testuser', password: 'testpass' }, // Use plain passwords for seeding
    { username: 'admin', password: 'adminpass' },
  ];

  for (const user of userData) {
    const hashedPassword = await hash(user.password); // Hash the password
    await db.insert(users).values({
      username: user.username,
      password: hashedPassword, // Store the hashed password
    });
  }

  console.log('Users seeded successfully');
};

seedUsers().catch((error) => {
  console.error('Error seeding users:', error);
}); 