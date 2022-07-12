const express = require("express"),
    router = express.Router();




var okupasiRoute = require('./okupasiController')
var pengajuanRoute = require('./pengajuanController')


router.use('/okupasi', okupasiRoute)
router.use('/pengajuan',pengajuanRoute)


module.exports = router