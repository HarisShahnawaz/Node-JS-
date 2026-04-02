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
module.exports = {
    handleGetAllUsers,
    handleGetUserById,
};