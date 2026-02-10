const mongoose = require('mongoose');

async function main() {
  try {
    // Set connection options for serverless environment
    const options = {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true,
      retryReads: true,
    };

    // Connect to MongoDB
    await mongoose.connect(process.env.mongoose_url, options);
    console.log('MongoDB connected successfully');
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });
    
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Don't throw error in serverless environment, let it retry
    console.log('Connection failed, will retry on next request');
  }
}

// Helper function to ensure connection
async function ensureConnection() {
  if (mongoose.connection.readyState !== 1) {
    console.log("MongoDB not connected, attempting to connect...");
    try {
      await main();
    } catch (error) {
      console.log("Connection attempt failed, will retry");
    }
  }
  return mongoose.connection.readyState === 1;
}

module.exports = { main, ensureConnection };
