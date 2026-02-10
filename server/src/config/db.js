const mongoose = require('mongoose');

async function main() {
  try {
    await mongoose.connect(process.env.mongoose_url, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      maxPoolSize: 10, // Maintain up to 10 socket connections
      // Remove bufferCommands: false for serverless compatibility
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

module.exports = main;
