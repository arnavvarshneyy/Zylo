const mongoose = require('mongoose');

async function main() {
  try {
    await mongoose.connect(process.env.mongoose_url, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true,
      retryReads: true,
      bufferMaxEntries: 0,
      bufferCommands: false,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

module.exports = main;
