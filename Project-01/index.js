 const users = require("./MOCK_DATA.json")
 const fs = require("fs")
const express = require('express')

const app = express();
const PORT = 8000;

// Middleware ''''' plugin

app.use(express.urlencoded({extended: false}))



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
     return  res.json(users)
})
app.route('/api/users/:id')
.get((req,res)=> {
     const id = Number(req.params.id)
     const user = users.find((user)=> user.id===id)
     return res.json(user)
})
.patch((req,res)=>{
     //Todo :  edit user with id
     return res.json({status: "pending"})

})
.delete((req,res)=>{
       //Todo :  delete user with id
     return res.json({status: "pending"})
})





app.post("/api/users" , (req,res)=> {
   
    const body = req.body;
    users.push({ ...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data)=>{
       return res.json({status : "success", id: users.length + 1 })
    })
   
    
   
})




app.listen(PORT,() => console.log(`Server Started at Port ${PORT}`))




