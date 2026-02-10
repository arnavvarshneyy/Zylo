// const mongoose =require('mongoose');

// async function main(){
// await mongoose.connect(process.env.mongoose_url);
// // console.log('connected with database')
// }

// module.exports=main;


const mongoose = require("mongoose");

let isConnected = false;

async function main() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.mongoose_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

module.exports = main;
