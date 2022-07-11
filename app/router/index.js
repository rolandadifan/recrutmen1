const express = require("express"),
    router = express.Router();



var userRoute = require('./userRouter')
var authRoute = require('./authRouter')


router.use('/users',userRoute)
router.use('/auth',authRoute)

module.exports = router