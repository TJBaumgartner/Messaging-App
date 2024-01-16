const User = require('../models/user')
const asyncHandler = require("express-async-handler");
const Message = require('../models/message')

exports.message = asyncHandler(async (req,res) => {
    const user = await User.findOne({_id: req.params.id})
    if(user == null){
        return res.sendStatus(400).json('No users found')
    }
    res.json(user)
})