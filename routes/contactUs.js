const express = require('express');
const router = express.Router();
const ContactUs = require('../models/ContactUs');


router.get('/',(req,res) =>{
    let message = '' ;
    if(req.session.message){
        message = req.session.message
        req.session.message = null;
    }
    res.render('contactUs',{message});
});

router.post('/',(req,res) =>{
    console.log("post trigger");
    const {Name,email,Message} = req.body;
    console.log(req.body);
    let errors = [];
    if(!Name || !email ){
        errors.push({msg: "Please enter your Name and email"});
    }
    console.log(Name,email,Message,'before if');
    if(errors.length > 0 ){

        res.render('contactUs',{
            errors,
            Name,
            email,
            Message
        });
    }else{
        console.log('in  else');
        const contactus = new ContactUs({
            Name,
            email,
            Message
        });
        console.log(contactus.Name,contactus.email,contactus.Message);
        contactus.save()
        .then(contact =>{
            req.session.message = `Your Response Has Been Saved, we Will contact you shortly ${contact.Name}`;
            console.log("entry saved");
            res.redirect('/contactUs');
        })
        .catch(err => console.log(err));
    }
})


module.exports = router;