const http = require('http')
const fs = require('fs')

 
 
const mySever = http.createServer((req,res)=>{

    const log = `${Date.now()}: New request Recieved\n`
     fs.appendFile('log.txt',log,(err,data)=>{
         res.end('Hello From Server Again'); 
     })
     
})


mySever.listen(8000,()=> console.log("Server Started"));
