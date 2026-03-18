const express = require('express')

const app = express();

app.get('/', (req,res)=>{
    res.send('Hello from home page' )
})
app.get('/about', (req,res)=>{
    res.send(`hello ${req.query.name}`)
})


app.listen(8000, ()=> console.log("Server Started!"))
