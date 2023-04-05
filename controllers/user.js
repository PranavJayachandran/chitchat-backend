const creatError = require('http-errors')
const jwt = require('jsonwebtoken')
const user = require("../db/user")
const { getIdFromToken } = require("../utils/jwt")
const { sortTheChatOverTime } = require('../middlewares/user')
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
        userobj.messages.forEach(async (element) => {
            messages.push({ data: element, yours: 1 })
        })

        // userobj.friends.forEach(async (element) => {
        //     let data = await user.findOne({ email: element })
        //     messages.push({ data: data.messages, yours: 0 });
        // });


        let otherusers = await user.find({})
        otherusers.forEach(async (element) => {
            element.messages.forEach(async (item) => {
                if (item.user == userobj.name) {
                    let content = item;
                    content.user = element.name
                    messages.push({ data: content, yours: 0 })
                }

            })
        })
        res.send(messages);
    }
    catch (error) {
        next(error)
    }
}

exports.getChatsFrom = async (req, res, next) => {
    try {
        let messages = [];
        let userObj = await user.findOne({ email: req.body.user_email })
        let chat_user = await user.findOne({ name: req.body.chat_user_name })
        userObj.messages.forEach((message) => {
            if (message.user == chat_user.name)
                messages.push({ data: message, yours: 1 })
        })

        console.log(chat_user)
        chat_user.messages.forEach((message) => {
            if (message.user == userObj.name)
                messages.push({ data: message, yours: 0 })
        })
        res.send(await sortTheChatOverTime(messages))
    }
    catch (error) {
        next(error)
    }



}