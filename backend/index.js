const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const equipRouter = require('./routes/equipments');

const middle = require('./config/middleware');

const server = express();
const PORT = 5555;

// const connect2db = require('./config/database');
// connect2db.query('show tables',(err,result)=>{
//   console.log(result);
// })

//ตั้งค่า session สำหรับระบบ
server.use(session({
    secret: '@@aa555',
    resave: false,
    saveUninitialized: true,
    cookie: {}
  }))


//ตั้งค่าการ Parse ตัวแปรเมื่อ Client ส่งข้อมูลเข้ามา
server.use(bodyParser.urlencoded({ extended: false,limit:'500MB' }))
server.use(bodyParser.json({limit:'500MB'}))


//เรียกใช้งาน router
server.use('/api', indexRouter);
server.use('/api/users', usersRouter);
server.use('/api/equipment', equipRouter);
//middleware
server.use(middle);


server.listen(PORT,()=> console.log(`Server started port : ${PORT}`))