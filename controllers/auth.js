const { v4: uuid } = require('uuid')
const creatError = require('http-errors')
const JSONdb = require('simple-json-db')
const db = new JSONdb(process.env.JSON_DB_PATH, { asyncWrite: true })
const user = require("../db/user")
const { signJwtToken } = require('../utils/jwt')
/**
 * Access token delivery handler
 */
const tokenHandler = async (user) => {
    try {
        // generate token
        const accessToken = await signJwtToken(user, {
            secret: process.env.JWT_ACCESS_TOKEN_SECRET,
            expiresIn: process.env.JWT_EXPIRY
        })
        return Promise.resolve(accessToken)
    } catch (error) {
        return Promise.reject(error)
    }
}

// handles register
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, image, bio, friends, messages, reqs, unread } = req.body
        // this is just a demo code and not for production

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
        res.status(201)
        res.send('Account created successfully')
    } catch (error) {
        next(error)
    }
}

// handles login
exports.login = async (req, res, next) => {
    try {
        // const { email, password } = req.body

        // const userData = db.get(email)

        // if (!userData) throw creatError.NotFound()

        // const { id, username, password: dbPassword } = JSON.parse(userData)

        // if (!(id && (password === dbPassword))) throw creatError.Unauthorized()

        const { email, password } = req.body

        const userData = await user.findOne({ email: email })
        if (!userData) throw creatError.NotFound()
        const id = userData._id
        const username = userData.username
        if (!(id && (password === userData.password))) throw creatError.Unauthorized()
        const token = await tokenHandler({ id })
        res.send(token)
    } catch (error) {
        next(error)
    }
}

