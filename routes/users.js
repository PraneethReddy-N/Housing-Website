const express = require('express');

const UserRouter = express.Router();

UserRouter.get('/login',(req,res) =>{
    res.render('login')
})

UserRouter.get('/Register',(req,res) =>{
    res.render('register')
})

//Register Handle
UserRouter.post('/Register',(req,res) =>{
   const{ name,email,password,password2 } = req.body
   let errors = [];
   //check Required Feilds
    if(!name || !email || !password || !password2){
        errors.push({msg: 'Please fill al the feilds'});
    }
    if( password !== password2){
        errors.push({msg : "Passwords Does not Match!"});
    }

    //pass leng
    if(password.length < 6){
        errors.push({msg: 'password is weak'}); 
    }


    if(errors.length > 0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
        res.send('pass');
    }
})


UserRouter.post('/dashboard', (req, res) => {
    res.redirect('/dashboard');
});



module.exports = UserRouter;