const express = require("express"),
    router = express.Router();


const authController = require('../../controller/authController')
const auth = require('../../middleware/auth')

router.post('/login', authController.login)

router.use(auth)
router.get('/create', authController.createUser)
router.put('/profile/update', authController.updateProfile)


module.exports = router