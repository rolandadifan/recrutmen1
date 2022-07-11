const express = require("express"),
    router = express.Router();



var authRoute = require('./authRouter')
var pengajuanRoute = require('./pengajuanRouter')


router.use('/auth',authRoute)
router.use('/pengajuan',pengajuanRoute)

module.exports = router