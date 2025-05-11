const db = require('../models');
const bcrypt = require('bcryptjs');

async function createAdminUser() {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    // Check if admin user already exists
    const adminExists = await db.User.findOne({ where: { email: 'admin@school.com' } });
    if (adminExists) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await db.User.create({
      email: 'admin@school.com',
      password: hashedPassword,
      role: 'admin',
      firstName: 'Admin',
      lastName: 'User'
    });

    console.log('Admin user created successfully:', adminUser.email);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser(); 