const express = require('express')
const router = express.Router()

const { getUser, addUser, getChats, getUserByUserName, getUsers } = require('../controllers/user')
const { accessTokenValidator } = require('../middlewares/auth')
// accessToken validator middleware

router.post('/getUser', accessTokenValidator, getUser)
router.post("/addUser", accessTokenValidator, addUser)
router.get("/getChats", accessTokenValidator, getChats)
router.get("/getUsers", accessTokenValidator, getUsers)
router.post("/getUserByUserName", accessTokenValidator, getUserByUserName)
module.exports = router