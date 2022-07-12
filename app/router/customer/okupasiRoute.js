const express = require("express"),
    router = express.Router();


const okupasiController = require('../../controller/admin/okupasiController')
const auth = require('../../middleware/auth')
const role = require('../../middleware/permission')


router.get('/', okupasiController.get)
router.get('/:id', okupasiController.detail)


module.exports = router