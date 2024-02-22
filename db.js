const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_STRING);
    console.log('Database Connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const insert = async () => {
  
}

module.exports = connectDB;
