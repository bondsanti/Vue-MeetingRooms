const router = require('express').Router()
const { body,query } = require('express-validator');
const equipController = require('../controllers/equipController')
const {is_login} = require('../config/security')

router.get('/',[query('page').toInt().isInt().not().isEmpty().withMessage('ไม่พบข้อมูล')],equipController.index)

router.post('/insert',[
    body('eq_image').not().isEmpty().withMessage('เลือกรูปภาพ'),
    body('eq_name').not().isEmpty().withMessage('กรุณาป้อน ชื่ออุปกรณ์'),is_login
],equipController.insertData)

router.delete('/del/:id',[is_login],equipController.delData)

router.put('/edit/:id',[
    body('eq_image').not().isEmpty().withMessage('เลือกรูปภาพ'),
    body('eq_name').not().isEmpty().withMessage('กรุณาป้อน ชื่ออุปกรณ์'),is_login
],equipController.editData)


module.exports = router