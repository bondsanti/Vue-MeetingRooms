const { validationResult } = require('express-validator');
const model = require('../models/equipModel')
const base64Img = require('base64-img');
const fs = require('fs');
const path = require('path');
const uploadDir= path.resolve('uploads');
const equipDir= path.join(uploadDir,'equip');



exports.index =async (req,res,next) =>{
    try{
        const equipData = await model.onSelect(req.query);
        res.status(200).json(
            equipData
        );

    }catch(error){
        next(error);
    }

}

exports.insertData = async(req,res,next) =>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
            error.statusCode = 422;
            error.validation = errors.array();
            throw error;
        }

        //ตรวจสอบ folder uploads ว่ามีหรือไม่
        if(!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
        if(!fs.existsSync(equipDir)) fs.mkdirSync(equipDir);
        //แปลงข้อมูลรูปภาพ
        req.body.eq_image = base64Img.imgSync(req.body.eq_image,equipDir,`equip-${Date.now()}`)
        .replace(`${equipDir}\\`,'');

        await model.onSave(req.body)
        res.status(201).json({ message: 'เพิ่มข้อมูลสำเร็จ' })

    }catch(error){
        next(error);
        const delImg = path.join(equipDir,req.body.eq_image);
        if(fs.existsSync(delImg)) fs.unlink(delImg, ()=> null)
    }
},

exports.delData = async(req,res,next)=>{
    try{

        const { id } = req.params;
        // console.log(id);
        const item = await model.onFineOne({eq_id : id})
        // console.log(item);
        if(!item){
            throw new Error('ไม่สามารถลบข้อมูลได้')
        }
        await model.onDelete(item.eq_id)
        const delImg = path.join(equipDir,item.eq_image);
        if(fs.existsSync(delImg)) fs.unlink(delImg, ()=> null)
        res.status(200).json({
            message: 'ลบข้อมูลเรียบร้อย'
        });
    }catch(error){
        res.status(400).json({
            error: {
                message: "เกิดข้อผิดพลาด Id ไม่ถูกต้อง " + error.message
            }
        });
    }
},

exports.editData = async(req,res,next)=>{
    try{

        const { id } = req.params;
        // console.log(id);
        const item = await model.onFineOne({eq_id : id})
        // console.log(item);
        if(!item){
            throw new Error('ไม่สามารถแก้ไขข้อมูลได้')
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
            error.statusCode = 422;
            error.validation = errors.array();
            throw error;
        }

        //ตรวจสอบ folder uploads ว่ามีหรือไม่
        if(!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
        if(!fs.existsSync(equipDir)) fs.mkdirSync(equipDir);
        //แปลงข้อมูลรูปภาพ
        req.body.eq_image = base64Img.imgSync(req.body.eq_image,equipDir,`equip-${Date.now()}`)
        .replace(`${equipDir}\\`,'');

       const updateData = await model.onUpdate(id,req.body);

       if(updateData) {
        const delImg = path.join(equipDir,item.eq_image);
        if(fs.existsSync(delImg)) fs.unlink(delImg, ()=> null)
       }

        res.status(200).json({
            message: 'แก้ไขข้อมูลเรียบร้อย'
        });

    }catch(error){
        res.status(400).json({
            error: {
                message: "เกิดข้อผิดพลาด Id ไม่ถูกต้อง " + error.message
            }
        });
    }
}