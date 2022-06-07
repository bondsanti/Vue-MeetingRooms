const { validationResult } = require('express-validator');
const {onRegister,onLogin} = require('../models/usersModel');
const {password_verify} = require('../config/security')

//Register
exports.register = async(req, res, next) => {
 try {
    const { u_username } = req.body
//Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
        error.statusCode = 422;
        error.validation = errors.array();
        throw error;
    }
    const checkUsername = await onLogin({u_username:u_username})
    if(checkUsername){
       const error = new Error('ชื่อผู้ใช้งาน ซ้ำ!! กรุณาลองอีกครั้ง');
       error.statusCode = 400;
       throw error;
    }
    await onRegister(req.body)

res.status(201).json({ message: 'ลงทะเบียนสำเร็จ' })

 } catch (error) {
    next(error); 
 }
}

//login
exports.login = async(req, res, next) => {
    try {

           //Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
        error.statusCode = 422;
        error.validation = errors.array();
        throw error;
    }

        const { u_username, u_password } = req.body
        // const userLoin = await onLogin(req.body)
        const checkLogin = await onLogin({u_username:u_username})
        if(!checkLogin){
            const error = new Error('ไม่พบผู้ใช้งานระบบ');
            error.statusCode = 404;
            throw error;
         }

        //ตรวจสอบรหัสผ่านว่าตรงกันหรือไม่
        const isValid = await password_verify(u_password,checkLogin.u_password);
        if(!isValid){
            const error = new Error('รหัสผ่านไม่ถูกต้อง');
            error.statusCode = 401;
            throw error;  
        }

       req.session.checkLogin =  checkLogin
      

    
    res.status(200).json({message: "เข้าสู่ระบบสำเร็จ" })
    //    res.status(200).json({
    //         message: 'เข้าสู่ระบบสำเร็จ' 
    //     })
    
     } catch (error) {
        next(error); 
     }
}
//profile
exports.profile =(req,res,next) =>{

    try{
        if(req.session.checkLogin){
            const {u_id, u_firstname, u_lastname, u_role} = req.session.checkLogin
            return res.status(200).json({
                data: {
                    id: u_id,
                    fname: u_firstname,
                    lname: u_lastname,
                    role: u_role
                }
            });
        }

        throw new Error('คุณไม่ได้เข้าสู่ระบบ')
    } catch (error) {
        next(error); 
     }

}
//logout
exports.logout =(req,res,next) =>{
        try{
             delete req.session.checkLogin;
            res.status(200).json({message: "ออกจากระบบสำเร็จ" })
        } catch (error) {
            res.error(error) 
        
        }

}