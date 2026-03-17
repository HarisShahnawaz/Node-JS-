const { log } = require("console")
const fs = require("fs")

const os = require('os')

console.log(os.cpus().length);

//sync....  blocking....

// fs.writeFileSync('./test.txt' , 'hey there')  

//Async.... non-blcking request      

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


// fs.appendFileSync('./test.txt' , `${Date.now()}hey there\n` )

// // fs.cpSync('./test.txt','./copy.txt')

// // fs.unlinkSync('./copy.txt')

// console.log(fs.statSync('./test.txt'));




// fs.mkdirSync('my-docs')


// ......................................new lec/................

// console.log('1'); 

// blocking

// const result = fs.readFileSync('./test.txt','utf-8')
// console.log(result);


// console.log('3');
// console.log('4');
// console.log('7');


// non- blocking

fs.readFile('./test.txt','utf-8', (err,result)=>{
    //  console.log(result);
})
// console.log('3');
// console.log('4');
//  console.log('7');
 
//  default thread poool size = 4

// max?  8core cpu =8