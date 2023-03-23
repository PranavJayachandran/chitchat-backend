const express = require('express')
const router = express.Router()

const { getUser, addUser } = require('../controllers/user')
const { accessTokenValidator } = require('../middlewares/auth')
// accessToken validator middleware

router.get('/info', accessTokenValidator, getUser)
router.post("/adduser", accessTokenValidator, addUser)
module.exports = router