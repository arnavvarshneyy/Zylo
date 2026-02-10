const jwt = require('jsonwebtoken');
const user = require('../models/user'); 
const getRedisClient = require('../config/redis');
const mongoose = require('mongoose');
require('dotenv').config();

async function tokenVerifyMiddleware(req, res, next) {
    try {
        const { token } = req.cookies;
        if (!token) return res.status(401).send('No token provided');

        // Check MongoDB connection state
        if (mongoose.connection.readyState !== 1) {
            console.log("MongoDB not connected in tokenVerify, state:", mongoose.connection.readyState);
            // Wait for connection
            await new Promise((resolve) => {
                const checkConnection = () => {
                    if (mongoose.connection.readyState === 1) {
                        resolve();
                    } else {
                        setTimeout(checkConnection, 100);
                    }
                };
                checkConnection();
            });
        }

        // Get Redis client instance
        const redisClient = getRedisClient();
        
        //check if token is blocked or not 
        const isBlocked = await redisClient.exists(`token:${token}`);
        if(isBlocked) throw new Error('Token expires');
            
        const secret = process.env.JWT_SECRET || process.env.jwt_secret_key;
        const payload = jwt.verify(token, secret);
        const foundUser = await user.findById(payload._id); 
        if (!foundUser) return res.status(401).send('Invalid token');

        req.user = foundUser; // Attach user info
        next();
    } catch (err) {
        console.log(err.message);
        res.status(400).send('Invalid or expired token');
    }
}


module.exports=tokenVerifyMiddleware
