 const users = require("./MOCK_DATA.json")
const express = require('express')
const app = express();
const PORT = 8000;

// Routes

app.get("/api/users", (req,res)=> {
     return  res.json(users)
})

app.get('/users' , (req,res)=> {
    const html =
    ` <ul>
      ${users.map(user => `<li>${user.first_name}<li>`).join("")}
    <ul>
    `


    return res.send(html)
})

app.listen(PORT,() => console.log(`Server Started at Port ${PORT}`))




