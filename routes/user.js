const express = require('express')
const router = express.Router()

const { getUser, addUser, getChats, getUserByUserName, getUsers, getChatsFrom } = require('../controllers/user')
const { accessTokenValidator } = require('../middlewares/auth')
// accessToken validator middleware

router.post('/getUser', accessTokenValidator, getUser)
router.post("/addUser", accessTokenValidator, addUser)
router.post("/getChats", accessTokenValidator, getChats)
router.post("/getChatsFrom", accessTokenValidator, getChatsFrom)
router.get("/getUsers", accessTokenValidator, getUsers)
router.post("/getUserByUserName", accessTokenValidator, getUserByUserName)
module.exports = router