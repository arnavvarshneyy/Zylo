const express = require('express')
const main = require("./src/config/db")
const authRouter=require("./src/routes/userAuth");
const problemRouter = require("./src/routes/problemRouter")
const Problem = require('./src/models/Problem')
const submitRouter = require("./src/routes/submitProblem")
const aiChatRouter = require('./src/routes/aiChatRouter')
const getRedisClient = require('./src/config/redis');
const cookieParser = require('cookie-parser');
const cors = require('cors')
require('dotenv').config();

const app = express();

app.set("trust proxy", 1);

//inbuild middleware
app.use(cookieParser());
app.use(express.json());


//allows cors
app.use(cors({
    origin:["http://localhost:5173",
        "https://zylo-frontend-liart.vercel.app",
    ],   // * - for all origin
    credentials:true,
}))

// app.use(cors({ origin: "*"}));



app.use("/user",authRouter);
app.use("/problem",problemRouter);
app.use("/submission",submitRouter);
app.use('/ai',aiChatRouter)


// connect once
let isConnected = false;

async function connection() {
  try {
    if (!isConnected) {
      await Promise.all([
        main(),
        getRedisClient().isOpen ? Promise.resolve() : getRedisClient().connect(),
      ]);
      isConnected = true;
      console.log("connected with db");
    }
  const isVercel = process.env.VERCEL === "1";
  if (!isVercel) {
    app.listen(process.env.PORT || 3000, () => {
     console.log("server is listening");
  });
}
} catch (err) {
    console.log("error occured: ", err);
  }
}

connection();

module.exports = app;