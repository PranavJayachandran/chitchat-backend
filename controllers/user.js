const creatError = require('http-errors')
const JSONdb = require('simple-json-db')
const db = new JSONdb(process.env.JSON_DB_PATH, { asyncWrite: true })
const user = require("../db/user")
exports.getUser = async (req, res, next) => {
    try {
        // checking for any error occurance
        const { email } = req.payload
        if (!email) throw creatError.Unauthorized()

        const userData = await user.findOne({ email: email })

        if (!userData) throw creatError.NotFound()

        // creating user as json
        const userDataObj = JSON.parse(userData)

        // remove the password key before sending it to client
        delete userDataObj.password

        res.status(200).send(userDataObj)
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