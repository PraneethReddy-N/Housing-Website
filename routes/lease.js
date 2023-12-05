const express = require('express');
const router = express.Router();
const lease = require('../models/lease');
const User= require('../models/User');
const payment = require("../models/payment")
const stripe = require('stripe')('sk_test_51OEiYvFzwNtHS26bLB4bu2CHlnxCTzxlubRYt4vCgfoodltggFXUyOSzSKilsh8qnyOUeSQv69hJmDCBkjRwKA7P00acuEuqDr');


router.get('/',(req,res) =>{
    console.log(req.session.isNewUser);
          if(req.session.isNewUser === false || req.session.isNewUser === undefined){
            console.log('not new user' ,req.session.isNewUser);
            User.email = req.session.email
            console.log(User.email);
            const userEmai = {"userEmail" :User.email};
            lease.find(userEmai).then(email =>{
            if(email){
                    // console.log(userEmai,'this is the useremail', leasedetails.userEmail ,'is lease' , userEmai );
                    email.forEach(element => {
                        console.log(element.AnyId);
                        res.render('lease',{
                            leaseStartDate: element.leaseStartDate.toISOString().split('T')[0],
                            leaseEndDate: element.leaseEndDate.toISOString().split('T')[0],
                            leasePeriod:element.leasePeriod,
                            AnyId:element.AnyId,
                            image:element.image
                        });
                    });
                }  
               
                // console.log(leaseStartDate,
                //     leaseEndDate,
                //     leasePeriod);
            }).catch(err =>{
                console.log(err);
                res.status(500).send("Error Fetching lease details");
            });
          }else{
            console.log("coming through lease router");
            res.redirect('/leaseRenewal')
          }
    });
    





module.exports = router;