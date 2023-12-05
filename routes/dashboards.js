const express = require('express');
const router = express.Router();
const user = require('./users');

router.get('/',(req,res) =>{
    let message = '';
    let isNewUser = req.session.isNewUser;
    const email = req.session.email;
    if(req.session.message){
        console.log(message);
        message = req.session.message;
        req.session.message = null;
    }
    console.log(req.session.userId,'at dashboard');
    console.log(isNewUser,email);
    res.render('dashboard',{message,isNewUser,email});
})

module.exports = router;