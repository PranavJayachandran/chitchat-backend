const creatError = require('http-errors')
const jwt = require('jsonwebtoken')
const user = require("../db/user")
const { getIdFromToken } = require("../utils/jwt")
exports.getUser = async (req, res, next) => {
    try {
        // checking for any error occurance
        const email = req.body.email
        if (!email) throw creatError.Unauthorized()

        const userData = await user.findOne({ email: email })

        if (!userData) throw creatError.NotFound()
        res.status(200).send(userData)
    } catch (error) {
        next(error)
    }
}
exports.getUserByUserName = async (req, res, next) => {
    try {
        // checking for any error occurance
        const name = req.body.name
        if (!name) throw creatError.Unauthorized()

        const userData = await user.findOne({ name: name })

        if (!userData) throw creatError.NotFound()
        res.status(200).send(userData)
    } catch (error) {
        next(error)
    }
}
exports.getUsers = async (req, res, next) => {
    try {
        // checking for any error occurance
        const userData = await user.find({})
        if (!userData) throw creatError.NotFound()
        res.status(200).send(userData)
    } catch (error) {
        next(error)
    }
}

exports.addUser = async (req, res, next) => {
    try {
        const { name, email, password, image, bio, friends, messages, reqs, unread } = req.body
        const newuser = new user({
            name: name,
            email: email,
            password: password,
            image: image,
            bio: bio,
            friends: friends,
            messages: messages,
            unread: unread,
            req: reqs
        })
        await newuser.save();
        res.send("Done")

    } catch (error) {
        next(error)
    }
}

exports.getChats = async (req, res, next) => {
    try {
        const email = req.body.email
        let messages = [];
        let userobj = await user.findOne({ email: email })
        messages.push(userobj.messages)
        userobj.friends.forEach(async (element) => {
            let data = await user.findOne({ email: element })
            messages.push(data.messages);
        });
        res.send(messages);
    }
    catch (error) {
        next(error)
    }
}