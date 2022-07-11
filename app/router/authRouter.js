const express = require("express"),
    router = express.Router();


const authController = require('../controller/authController')
const auth = require('../middleware/auth')

router.get('/create', authController.createUser)


module.exports = router