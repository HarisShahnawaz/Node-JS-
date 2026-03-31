const express = require('express');

const router = express.Router();



router.get("/", async (req,res)=> {
     const allDBUsers =  await User.find({});             // res.setHeader("X-myName", "Haris") //custom header                                            
     return  res.json(allDBUsers)                          // //always add X to custom headers (these were custom headers)
})
router
.route('/:id')
.get( async(req,res)=> {
     const user = await User.findById(req.params.id);
     if(!user)
        return res.status(404).json({error:'error1 :  user not found '})
     return res.json(user)
})
.patch( async (req, res) => {
      await  User.findByIdAndUpdate(req.params.id , { lastName: "changed"});
      return res.json({status:"success"});
      
})
.delete( async (req, res) => {
       await User.findByIdAndDelete(req.params.id)
       return res.json({status:"success"});
})





app.post("/" , async (req,res)=> {
   
    const body = req.body;
   if (
    !body?.first_name?.trim() || 
    !body?.last_name?.trim() || 
    !body?.email?.trim() || 
    !body?.gender || 
    !body?.job_title
) {
    return res.status(400).json({ msg: 'Msg: All fields are required and cannot be empty' });
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
    // })           this was for mock data json file , now for mongodb we dont need these lines of code
});

module.exports = router;