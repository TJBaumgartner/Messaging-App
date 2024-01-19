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

exports.allMessages = asyncHandler(async (req,res) => {
    // const [messageRecipient, messageSender] = await Promise.all([
    //     Message.find({toUser: req.body.sender, fromUser: req.body.recipient}),
    //     Message.find({toUser: req.body.recipient, fromUser: req.body.sender}),
    // ])
    // console.log(messageRecipient, messageSender)
    // res.status(200).json([messageRecipient, messageSender])
    const allMessages = await Message.find({ $or: [
        {toUser: req.body.sender, fromUser: req.body.recipient},
        {toUser: req.body.recipient, fromUser: req.body.sender}
    ]}).sort({createdAt: 1})
    // console.log(messageRecipient, messageSender)
    res.status(200).json(allMessages)
})

exports.messageSend = asyncHandler(async (req,res) => {
    const [recipient, sender] = await Promise.all([
        User.findOne({_id: req.body.recipient}),
        User.findOne({_id: req.body.sender})
    ])
    if(recipient == null || sender == null){
        res.sendStatus(403).json('Message Failed to Send')
    }
    const message = new Message({
        message: req.body.message,
        fromUser: req.body.sender,
        toUser: req.body.recipient
    })
    await message.save()
    res.status(200).json('Message Sent')
})