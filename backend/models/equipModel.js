const connect2db = require("../config/database");

module.exports = {
    onSave(value) {
        return new Promise((resolve, reject) => {
            // resolve(value);
            connect2db.query(
                "INSERT INTO tb_equipments SET ?",
                value,
                (error, result, field) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
        });
    },
    onSelect(value) {
        return new Promise((resolve, reject) => {
            const limitPage=5;
            const startPage=((value.page || 1) -1) * limitPage;
            const sqls = {
                count:'SELECT COUNT(*) AS row FROM tb_equipments',
                select:'SELECT * FROM tb_equipments'
            }

            if(value.search_key && value.search_text){
                const key = value.search_key;
                const txt = value.search_text;
                const sqlSerch = ` WHERE ${connect2db.escapeId(key)} LIKE ${connect2db.escape(`%${txt}%`)}`;
                sqls.count += sqlSerch;
                sqls.select += sqlSerch;
            }

            //หาจำนวนแถว
            connect2db.query(sqls.count,
                (error, result, field) => {
                    if (error) return reject(error);
                    const items = {result:[],rows:result[0].row}

                    //แบ่งหน้า page
                    sqls.select +=` LIMIT ${connect2db.escape(startPage)}, ${limitPage}`;
                    connect2db.query(sqls.select,(error,result,field)=>{
                        if(error) return reject(error)
                        items.result=result
                        resolve(items);
                    })
                    

                }
            );
        });
    },
    onFineOne(value) {
        return new Promise((resolve, reject) => {
            connect2db.query(
                "SELECT * FROM tb_equipments WHERE eq_id=?",
                [value.eq_id],
                (error, result, field) => {
                    if (error) return reject(error);
                    resolve(result[0]);
                }
            );
        });
    },
    onDelete(id) {
        return new Promise((resolve, reject) => {
            connect2db.query(
                "DELETE FROM tb_equipments WHERE eq_id=?",
                [id],
                (error, result, field) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
        });
    },
    onUpdate(id,value){
        return new Promise((resolve,reject)=>{
            const $query=`UPDATE tb_equipments SET 
            eq_image =?,
            eq_name =?,
            eq_detail =?
            WHERE eq_id=?`;
            connect2db.query($query,
                [
                value.eq_image,
                value.eq_name,
                value.eq_detail,
                id
            ],(error,result)=>{
                if(error) return reject(error);
                resolve(result);
            })
        })
    }
};
