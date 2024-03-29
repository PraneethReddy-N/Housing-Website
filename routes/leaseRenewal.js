const express = require('express');
const router = express.Router();
const lease = require('../models/lease');
const user  = require('../models/User')
const payment = require("../models/payment");
const Transactions = require('../models/leaseTransactions');
const stripe = require('stripe')('sk_test_51OEiYvFzwNtHS26bLB4bu2CHlnxCTzxlubRYt4vCgfoodltggFXUyOSzSKilsh8qnyOUeSQv69hJmDCBkjRwKA7P00acuEuqDr');
 
router.get('/',(req,res) =>{
  res.render('leaseRenewal');
})

router.post('/',(req,res) =>{
    const{leaseStartDate,leaseEndDate,AnyId,image,BedRoomType} = req.body;
    let errors = [];
    console.log(req.session.userId,'at renewal');
    console.log("Lease Start Date:", leaseStartDate);
    console.log("Lease End Date:", leaseEndDate);
    console.log("Any ID:", AnyId);
    console.log("Image:", image);
    console.log("Bed Room Type:",BedRoomType);
    let unitAmount;
                switch(req.body.BedRoomType){
                    case 'oneBedRoom':
                        unitAmount = 100;
                        break;
                    case 'TwoBedRoom' :
                        unitAmount = 100;
                        break;
                    default:
                        unitAmount = 0;
                }
                if(unitAmount === 0){
                    return res.status(404).send('Invalid Bed Room Type Selected');
                }
    const start = new Date(leaseStartDate);
    const end = new Date(leaseEndDate);
    const userEmail = req.session.email;
    console.log(userEmail);
    leasePeriod = monthDif(start,end);
    req.session.isNewUser = false;
    if(!leaseStartDate||!leaseEndDate||!AnyId ||!image || !BedRoomType){
        errors.push({msg:"please enter all the details"});
    }
    if(errors.length > 0){
        res.render('leaseRenewal',{
            errors,
            leaseStartDate,
            leaseEndDate,
            AnyId,
            image,
            BedRoomType
            
        });
    }else{
        const leasedetails= new lease({
            leaseStartDate,
            leaseEndDate,
            leasePeriod,
            AnyId,
            image,
            BedRoomType,
            unitAmount,
            userEmail
        });
        console.log("in else");
        console.log(leasedetails)
        leasedetails.save()
        .then(
            details =>{
                console.log("Lease Details after save:", details);
                stripe.checkout.sessions.create({
                    payment_method_types:['card'],
                    line_items:[{
                        price_data:{
                            currency:'usd',
                            product_data:{
                                name:'LeasePayment',
                            },
                            unit_amount : unitAmount,
                        },
                        quantity: 1,
                    }],
                    mode: 'payment',
                    success_url: `${req.headers.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${req.headers.origin}/leaseRenewal`, 
                    customer_email: req.session.email,
                }, (err, session) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Error creating Stripe checkout session');
                    }
                
                    res.redirect(303, session.url);
                });
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('Error Storing lease details');
            });
    }
 
 })
 function monthDif(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}


router.get('/payment-success' , (req,res) => {
    const session_id = req.query.session_id;
    if(!session_id){
        return res.status(400).send('Session ID is missing');
    }

    stripe.checkout.sessions.retrieve(session_id)
    .then(session =>{
        const userEmail = req.session.email;
        const transactionDetails = new Transactions({
            session_id: session.id,
            payment_intent: session.payment_intent,
            amount_total: session.amount_total,
            currency: session.currency,
            payment_status: session.payment_status,
            user_email: userEmail,
        });
        transactionDetails.save()
        .then( details => {
            req.session.message = `hello  , your lease has been confirmed  and a reciept of the lease agreement has been sent to your email ${userEmail} `;
            res.redirect('/dashboard');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error confirming transaction');
        });

    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Error retrieving the payment information');
    })
    
})


module.exports = router;