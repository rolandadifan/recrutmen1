const express = require("express"),
    router = express.Router();


const pengajuanController = require('../../controller/customer/pengajuanController')
const auth = require('../../middleware/auth')
const role = require('../../middleware/permission')

router.use(auth,role('customer'))
router.post('/', pengajuanController.create)
router.get('/', pengajuanController.get)
router.get('/invoice/:id', pengajuanController.invoice)
router.get('/purchase/:id', pengajuanController.bayar)


module.exports = router