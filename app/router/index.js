const express = require("express"),
    router = express.Router();



var adminRoute = require('./admin/index')
var customerRoute = require('./customer/index')


router.use('/admin',adminRoute)
router.use('/customer',customerRoute)


module.exports = router