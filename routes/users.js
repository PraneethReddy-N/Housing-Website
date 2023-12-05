const express = require('express');

const UserRouter = express.Router();
// const bcrypt =express.bcrypt();
const bcrypt =require('bcryptjs');
const User = require('../models/User');
const lease = require('../models/lease');

UserRouter.get('/login',(req,res) =>{
    let message = '';
    if(req.session.message){
        message = req.session.message;
        console.log("in users and the message = " ,message);
        req.session.message = null;
    } 
        res.render('login',{message});
    
})



UserRouter.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.render('login', { message: 'Invalid email or password' });
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.render('login', { message: 'Invalid email or password' });
                    }else{
                        req.session.userId = user._id;
                        console.log(req.session.userId,'at login');
                        req.session.email = user.email;
                        req.session.message = `Welcome Back ${user.name}!`;
                        console.log('here');
                        res.redirect('/dashboard');
                    }    
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).send('Error checking password');
                });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error finding user');
        });
});




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
        //validation
        User.findOne({email:email})
        .then(user =>{
             if(user){
                errors.push('Email is registered');
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
             }
             else{
                const newuser = new User({
                    name,
                    email,
                    password
                });
                //hash password
                bcrypt.genSalt(10,(errr,salt) => 
                bcrypt.hash(newuser.password,salt,(err,hash) =>{
                    if(err) throw err;

                    newuser.password = hash;

                    newuser.save()
                    .then(user => {
                        req.session.email = user.email;
                        req.session.isNewUser = true;
                        req.session.message = `Congrats ${name}, you are registered. Please log in below.`;
                        res.redirect('/users/login');
                    })
                    .catch(err => console.log(err));
                }))
             }
        })
    }
})


UserRouter.post('/dashboard', (req, res) => {
    res.redirect('/dashboard');
});




UserRouter.get('/logout', (req, res) => {
    // Clear the session
    console.log(req.session.userId,'at log out');
    req.session.destroy((err) => {
        if (err) {
            // Handle error case
            console.error("Error clearing the session: ", err);
            res.status(500).send("Error during logout");
        } else {
            // Redirect to home page or login page after logout
            res.redirect('/');
        }
    });
});

module.exports = UserRouter;





module.exports = UserRouter;