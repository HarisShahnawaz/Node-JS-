const express = require('express');
const {connecttoMongoDB} = require('./connect');
const path = require('path');

const URL = require('./models/URL');


const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');
const { url } = require('inspector');


const app = express();
const PORT = 8001;

connecttoMongoDB("mongodb://localhost:27017/short-url").then(() => {
    console.log("   MongoDB Connected ");
});

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use("/url", urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.get('/url/:shortId', async (req,res)=>{
    const shortId = req.params.shortId;
  const entry =  await URL.findOneAndUpdate({
      shortId,
    }, {$push: {
        visitHistory: {timestamp: Date.now()}
     }});
     res.redirect(entry.redirectUrl);
})


app.listen(PORT, () => console.log(`Server Started at port ${PORT}`));