 const users = require("./MOCK_DATA.json")
 const fs = require("fs")
 const mongoose = require('mongoose')
const express = require('express');
const { log } = require("console");
const { type } = require("os");

const app = express();
const PORT = 8000;
// Connection

mongoose.connect("mongodb://127.0.0.1:27017/my-app-1")
.then(()=> console.log("MongoDB Connected"))
.catch((err)=> console.log("Mongo error", err));


// mongodb Schema

const userSchema = new mongoose.Schema({
         firstName:{
          type: String,
          required: true,
         },
         lastName:{
          type: String,
         },
         email:{
           type: String,
          required: true,
          unique: true,
         },
         jobTitle:{
            type: String,
         },
         gender:{
             type:String,
         }
},{timestamps: true});

// mongdb Model

const User = mongoose.model('user', userSchema)

// Middleware ''''' plugin

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use((req,res, next)=> {
    fs.appendFile('.log.txt', `\n${Date.now()}: ${req.ip} ${req.method}: ${req.path}`, (req,res)=>{
     next();
    })
})


// Routes

app.get('/users' , (req,res)=> {
    const html =
    ` <ul>
      ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    return res.send(html)
})
// REST API

app.get("/api/users", (req,res)=> {
    res.setHeader("X-myName", "Haris") //custom headers

    //always add X to custom headers
     return  res.json(users)
})
app.route('/api/users/:id')
.get((req,res)=> {
     const id = Number(req.params.id)
     const user = users.find((user)=> user.id===id)
     if(!user)
        return res.status(404).json({error:'error1 :  user not found '})
     return res.json(user)
})
.patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
      
    const user = users.find(u => u.id === id);

    Object.assign(user, body);


    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), () => {
        return res.json({ status: "success" });
    });
    console.log(req.body);
})
.delete((req, res) => {
    const id = Number(req.params.id);

    const updatedUsers = users.filter(u => u.id !== id);
    users.length = 0;
    users.push(...updatedUsers);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), () => {
        return res.json({ status: "success" });
    });
})





app.post("/api/users" , async (req,res)=> {
   
    const body = req.body;
   if (
    !body?.first_name?.trim() || 
    !body?.last_name?.trim() || 
    !body?.email?.trim() || 
    !body?.gender || 
    !body?.job_title
) {
    return res.status(400).json({ msg: 'All fields are required and cannot be empty' });
}

   const result =  await User.create(
        {
            firstName : body.first_name,
            lastName : body.last_name,
            email: body.email,
            gender: body.gender,
            jobTitle: body.job_title
        });
        
        return res.status(201).json({msg: "success"})
        
    // users.push({ ...body, id: users.length + 1});
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data)=>{
    //    return res.status(201).json({status : "success", id: users.length })
    // })               this was for mock data json, now for mongodb we dont need these
});





app.listen(PORT,() => console.log(`Server Started at Port ${PORT}`))




