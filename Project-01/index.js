const fs = require("fs")
const express = require('express');

const {logReqRes} = require('./middlewares')
const { log } = require("console");
const { type } = require("os");
const {connectMongoDB} = require('./connection')
const userRouter = require('./routes/user')
const app = express();
const PORT = 8000;
// Connection
connectMongoDB("mongodb://127.0.0.1:27017/my-app-1")





// Middleware ''''' plugin

app.use(express.urlencoded({extended: false}))



app.use(logReqRes("log.txt"))



//routes

app.use("/user", userRouter)


app.listen(PORT,() => console.log(`Server Started at Port ${PORT}`))




