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

app.get('/test', async (req,res)=> {
    const allUrls =  await URL.find({});
  return  res.end(`<html>
                    <head></head>
                    <body>
                    <ol>
                    ${allUrls.map(url => `<li>${url.redirectUrl} - ${url.shortId} - ${url.visitHistory.length}</li>`).join('')}
                    </ol>
                    </body>
                   </html>`);
})

app.get('/url/:shortId', async (req,res)=>{
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