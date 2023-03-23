const express = require('express')
const router = express.Router()

const { getUser, addUser, getChats } = require('../controllers/user')
const { accessTokenValidator } = require('../middlewares/auth')
// accessToken validator middleware

router.get('/info', accessTokenValidator, getUser)
router.post("/addUser", accessTokenValidator, addUser)
router.post("/getChats", accessTokenValidator, getChats)
module.exports = router