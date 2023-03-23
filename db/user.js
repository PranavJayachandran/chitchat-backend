const { default: mongoose } = require("mongoose");

mongoose.connect(process.env.MONGO_URL);


const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: String,
    email: { type: 'String', unique: true },
    password: String,
    image: String,
    bio: String,
    friends: [String],
    messages: [
        {
            user: String,
            content: String,
            time: String,
        }
    ],
    req: [String]
})

const user = model('user', userSchema)
module.exports = user;