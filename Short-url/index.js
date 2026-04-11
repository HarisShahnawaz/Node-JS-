const express = require('express');
const {connecttoMongoDB} = require('./connect');
const urlRoute = require('./routes/url');
const URL = require('./models/URL');
const app = express();
const PORT = 8001;

connecttoMongoDB("mongodb://localhost:27017/short-url").then(() => {
    console.log("   MongoDB Connected ");
});

app.use(express.json());

app.get('/test', (req,res)=> {
  return  res.end("<h1>Hey from server</h1>");
})

app.get('/:shortId', async (req,res)=>{
    const shortId = req.params.shortId;
  const entry =  await URL.findOneAndUpdate({
      shortId,
    }, {$push: {
        visitHistory: {timestamp: Date.now()}
     }});
     res.redirect(entry.redirectUrl);
})
app.use("/url", urlRoute);
app.listen(PORT, () => console.log(`Server Started at port ${PORT}`));