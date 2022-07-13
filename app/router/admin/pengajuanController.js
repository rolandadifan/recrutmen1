const express = require("express"),
    router = express.Router();


const pengajuanController = require('../../controller/admin/pengajuanController')
const auth = require('../../middleware/auth')
const role = require('../../middleware/permission')

router.use(auth,role('admin'))
router.get('/', pengajuanController.list)
router.get('/:id', pengajuanController.detail)
router.post('/aproval', pengajuanController.approval)



module.exports = router