const express = require('express');
const {connecttoMongoDB} = require('./connect');
const urlRoute = require('./routes/url');
const { applyTimestamps } = require('./models/URL');
const app = express();
const PORT = 8001;

connecttoMongoDB("mongodb://localhost:27017/short-url").then(() => {
    console.log("   MongoDB Connected ");
});

app.use("/url", urlRoute);
app.listen(PORT, () => console.log(`Server Started at port ${PORT}`));