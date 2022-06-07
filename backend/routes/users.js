const router = require('express').Router()
const { body } = require('express-validator');
const usersController = require('../controllers/usersController')

router.get('/',(req,res) =>{
    res.end("<h1> Data Users </h1>")
})

router.post('/regis',[
    body('u_username').not().isEmpty().withMessage('กรุณาป้อน ชื่อผู้ใช้').isLength({min: 3 }).withMessage('ชื่อผู้ใช้ต้องมากกว่า 3 ตัวอักษร'),
    body('u_password').not().isEmpty().withMessage('กรุณาป้อน รหัสผ่าน').isLength({min: 3 }).withMessage('รหัสผ่านต้องมากกว่า 3 ตัวอักษร'),
    body('u_firstname').not().isEmpty().withMessage('กรุณาป้อน ชื่อ'),
    body('u_lastname').not().isEmpty().withMessage('กรุณาป้อน นามสกุล')

],usersController.register)

router.post('/login',[
    body('u_username').not().isEmpty().withMessage('กรุณาป้อน ชื่อผู้ใช้'),
    body('u_password').not().isEmpty().withMessage('กรุณาป้อน รหัสผ่าน')
],usersController.login)

router.get('/profile',usersController.profile)
router.post('/logout',usersController.logout)

module.exports = router