const e = require('express');
const connect2db = require('../config/database')
const {password_hash,password_verify} = require('../config/security')

module.exports = {
    onRegister(value){
        return new Promise((resolve,reject)=>{
            value.u_password = password_hash(value.u_password);
            // resolve(value);
             connect2db.query('INSERT INTO tb_users SET ?',value,(error, result,field)=>{
                if (error) return reject(error);
                resolve(result)
            })
            
        })
    },
    onLogin(value){
        return new Promise((resolve,reject)=>{
            connect2db.query('SELECT * FROM tb_users WHERE u_username=?',[value.u_username],(error, result,field)=>{
            if (error) return reject(error);
            resolve(result[0])
            
            // if(result.length > 0){
            //     const userLoin = result[0];
            //     if(password_verify(value.u_password,userLoin.u_password)){
            //         resolve(userLoin)
            //     }else{
            //         reject(new Error('ผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง'))
            //     }
            // }
            
        })
    })
  },
}