const creatError = require('http-errors')
const JSONdb = require('simple-json-db')
const db = new JSONdb(process.env.JSON_DB_PATH, { asyncWrite: true })
const user = require("../db/user")
exports.getUser = async (req, res, next) => {
    try {
        // checking for any error occurance
        const { email } = req.payload
        if (!email) throw creatError.Unauthorized()

        const userData = db.get(email)

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
        const newuser = new user({
            name: 'String',
            email: 'String',
            password: 'String',
            image: 'String',
            bio: 'String',
            friends: ['String'],
            messages: [
                {
                    user: 'String',
                    content: 'String',
                    time: 'String',
                }
            ],
            req: ['String']
        })
        await newuser.save();
        res.send("Done")

    } catch (error) {
        next(error)
    }
}