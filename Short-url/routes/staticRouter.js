const express = require('express');  
const Url = require('../models/URL');
const URL = require('../models/URL');
const router = express.Router();


router.get('/', async (req,res)=>{
  const allurls = await URL.find({})
    return res.render("home" , { urls: allurls });
})

router.get('/signup' , (req,res)=>{
 return res.render("signup");
});
module.exports = router;