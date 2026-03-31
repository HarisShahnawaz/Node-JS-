async function handleGetAllUsers(req, res) {
    const allDBUsers =  await User.find({});                                                        
     return  res.json(allDBUsers)  
}