const { log } = require("console")
const fs = require("fs")
//sync....

// fs.writeFileSync('./test.txt' , 'hey there')  

//Async....

// fs.writeFile('./test.txt' , 'hey haris',(err) => { })

// const result = fs.readFileSync('./contacts.txt' , 'utf-8')
//  console.log(result)

// fs.readFile('./contacts.txt','utf-8',(err,result)=>{

//     if(err){
//     console.log('error',err)
//     }
//     else{
//     console.log(result)
//     }
// })


fs.appendFileSync('./test.txt' , `${Date.now()}hey there\n` )

// fs.cpSync('./test.txt','./copy.txt')

// fs.unlinkSync('./copy.txt')

console.log(fs.statSync('./test.txt'));


fs.mkdirSync('my-docs')