const http = require('http')
const fs = require('fs')
const url = require('url')
   
 
const mySever = http.createServer((req,res)=>{
    if (req.url === "/favicon.ico") return res.end

    const log = `${Date.now()}: ${req.method} ${req.url} New request Recieved\n`

    const myUrl = url.parse(req.url , true)

    
     fs.appendFile('log.txt',log,(err,data)=>{

         switch (myUrl.pathname) {
            case  ('/'): 
               if (req.method === "Get") {
                res.end('Home page'); 
               }  
                break;
                case  ('/about'): 
                const username = myUrl.query.myname
                 res.end(`Hi,${username}`); 
                break;
                case ("/search"):
                const search=  myUrl.query.search_query
                res.end("Here are your results for" +search )
                case ("/signup"):
                    if (req.method === "GET")
                         {
                res.end('this is a signup form');
               } 
               else if(req.method === "POST"){
                //db query
                res.end('success');
               }
               break;

            default:
                res.end('Error 404 Not Found'); 
                break;
         }

        
     })
     
})


mySever.listen(8000,()=> console.log("Server Started"));
