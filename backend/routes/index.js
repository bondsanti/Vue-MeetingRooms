const router = require('express').Router();

router.get('/',(req,res,next)=>{
    res.end("<h1> index page in route </h1>")
})

module.exports = router;