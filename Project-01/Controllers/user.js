const User = require('../models/user');

async function handleGetAllUsers(req, res) {
    const allDBUsers =  await User.find({});                                                        
     return  res.json(allDBUsers)  
}


async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
     if(!user)
        return res.status(404).json({error:'error1 :  user not found '})
     return res.json(user)
}
async function handleUpdateUserById(req, res) {
     await  User.findByIdAndUpdate(req.params.id , { lastName: "changed"});
      return res.json({status:"success"});
    }
    async function handleDeleteUserById(req, res) {
     await User.findByIdAndDelete(req.params.id)
       return res.json({status:"success"});
    }
async function handleCreateNewUser(req, res){
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
        
        return res.status(201).json({msg: "success", id: result._id})
}



module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
};