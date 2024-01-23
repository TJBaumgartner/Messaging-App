const User = require('../models/user')
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Token = require('../models/refreshToken')


exports.allUsers = asyncHandler(async (req,res) => {
    const allUsers = await User.find().sort({username: 1}).exec()
    if(allUsers == null){
        return res.send(400).json('No users found')
    }
    res.json(allUsers)
})

exports.profile = asyncHandler(async (req,res) => {
    const user = await User.findOne({_id: req.params.id})
    if(user == null){
        return res.send(401).json('No users found')
    }
    res.json(user)
})

exports.profileEdit = asyncHandler(async (req,res) => {
    const user = await User.findOne({_id: req.params.id})
    if(user == null){
        return res.send(401).json('No users found')
    }
    const updatedUser = new User({
        username: user.username,
        password: user.password,
        bio: req.body.bio,
        about: req.body.about,
        _id: user._id
    })
    console.log(updatedUser)
    await User.findOneAndUpdate({_id: req.params.id}, updatedUser)
    res.json(updatedUser)
})

exports.sign_up_post = asyncHandler(async (req,res) => {
    const userExists = await User.findOne({username: req.body.username}).exec()
    if(userExists){
        return res.status(400).send('User already exist. Try another name')
    }
    const securePass = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        username: req.body.username,
        password: securePass,
        bio: "User has no bio",
        about: "User has no about"
    })
    await user.save()
    return res.status(200).send('New User created!')
})

exports.logout = asyncHandler(async (req,res) => {
    const token = req.body.token;
    if(token == null) return res.sendStatus(404);
    const clearToken = await Token.findOne({token: token})
    if(!clearToken){
        return res.sendStatus(403)
    }
    await Token.findOneAndDelete({token: req.body.token});
    return res.sendStatus(200)
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN, {expiresIn: '20s'})
}

exports.login = asyncHandler(async (req, res) => {
    const user = await User.findOne({username: req.body.username})
    if(user == null){
        return res.status(400).send('User does not exist')
    }
    try{
        const passwordCheck = await bcrypt.compare(req.body.password, user.password)
        if(passwordCheck){
            const accessToken = generateAccessToken(user.toJSON())
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_TOKEN)
            const token = new Token({token: refreshToken})
            await token.save()
            res.json({accessToken: accessToken, refreshToken: refreshToken, name: user.username, userId: user.id})
        } else {
            return res.status(403).send('Incorrect Password')
        }
    } catch(err){
        res.status(500).send('No user')
    }
})

exports.refresh =  asyncHandler(async (req, res) => {
    const refreshToken = req.body.token
    
    if(refreshToken == null) {
        return res.sendStatus(401)
    }

    const token = await Token.findOne({token: refreshToken})

    if(!token){
        return res.sendStatus(403)
    }

    try{
        const user = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
        const newAccessToken = generateAccessToken({user: user.username})
        res.json({accessToken: newAccessToken})

    } catch(err){
        res.sendStatus(401)
    }
})

exports.test =  asyncHandler(async (req, res) => {
    res.json("hi")
})
