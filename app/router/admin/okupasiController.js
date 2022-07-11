const express = require("express"),
    router = express.Router();


const okupasiController = require('../../controller/admin/okupasiController')
const auth = require('../../middleware/auth')
const role = require('../../middleware/permission')

router.use(auth,role('admin'))
router.post('/create', okupasiController.create)
router.get('/', okupasiController.get)
router.get('/:id', okupasiController.detail)
router.put('/:id', okupasiController.update)
router.delete('/:id', okupasiController.delete)


module.exports = router