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
      },
    });

    redisClient.on("error", (err) => {
      console.error("Redis Error:", err);
    });
  }

  return redisClient;
}

module.exports = getRedisClient;
