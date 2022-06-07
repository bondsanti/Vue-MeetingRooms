const crypto = require('crypto');

const security = {
    password_hash(password){
        return crypto.createHash('sha1').update(password).digest('hex');
    },
    password_verify(password, password_hash){
        return security.password_hash(password)=== password_hash;
    },
    is_login(req,res,next){
        try {
            if(req.session.checkLogin){
                return next();
            }
            const error = new Error('คุณไม่ได้เข้าสู่ระบบ');
            error.statusCode = 401;
            throw error;  
        }catch (error){
            next(error); 
        }
    }
}

module.exports = security;