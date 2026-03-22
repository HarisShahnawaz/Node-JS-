 const users = require("./MOCK_DATA.json")
 const fs = require("fs")
const express = require('express');
const { log } = require("console");

const app = express();
const PORT = 8000;

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
     return  res.json(users)
})
app.route('/api/users/:id')
.get((req,res)=> {
     const id = Number(req.params.id)
     const user = users.find((user)=> user.id===id)
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





app.post("/api/users" , (req,res)=> {
   
    const body = req.body;
    users.push({ ...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data)=>{
       return res.json({status : "success", id: users.length })
    })    
})




app.listen(PORT,() => console.log(`Server Started at Port ${PORT}`))




