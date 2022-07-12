const express = require("express"),
    router = express.Router();



var authRoute = require('./authRouter')
var pengajuanRoute = require('./pengajuanRouter')
var okupasiRoute = require('./okupasiRoute')


router.use('/auth',authRoute)
router.use('/pengajuan',pengajuanRoute)
router.use('/okupasi',okupasiRoute)

module.exports = router