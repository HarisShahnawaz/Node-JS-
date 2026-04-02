const express = require('express');
const {logReqRes} = require('./middlewares')
const {connectMongoDB} = require('./connection')
const userRouter = require('./routes/user')
const app = express();
const PORT = 8000;
// Connection
connectMongoDB("mongodb://127.0.0.1:27017/my-app-1").then(() => console.log("Connected to MongoDB"))

// Middleware ''''' plugin

app.use(express.urlencoded({extended: false}))
app.use(logReqRes("log.txt"))

//routes

app.use("/api/users", userRouter)


app.listen(PORT,() => console.log(`Server Started at Port ${PORT}`))




