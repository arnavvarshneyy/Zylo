// const redis = require('redis')
// require('dotenv').config();

// const redisClient = redis.createClient({
//     username: 'default',
//     password: process.env.REDIS_PASS,
//     socket: {
//         host: process.env.REDIS_HOST,
//         port: process.env.REDIS_PORT
//     }
// })

// module.exports=redisClient;

const redis = require("redis");
require("dotenv").config();

let redisClient;

function getRedisClient() {
  if (!redisClient) {
    redisClient = redis.createClient({
      username: "default",
      password: process.env.REDIS_PASS,
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        connectTimeout: 5000,
        lazyConnect: true,
      },
    });

    redisClient.on("error", (err) => {
      console.error("Redis Error:", err);
    });

    redisClient.on("connect", () => {
      console.log("Redis connected successfully");
    });

    // Connect the client
    redisClient.connect().catch(console.error);
  }

  return redisClient;
}

module.exports = getRedisClient;
