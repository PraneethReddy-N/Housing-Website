const express = require('express');
const router = express.Router();

router.get('/',(req,res) =>{
    let message = '';
    if(req.session.message){
        console.log(message);
        message = req.session.message;
        req.session.message = null;
    }
    res.render('dashboard',{message});
})

module.exports = router;