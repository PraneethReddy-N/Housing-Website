const express = require('express');
const router = express.Router();
const lease = require('../models/lease');
const User= require('../models/User');
const stripe = require('stripe')('sk_test_51OEiYvFzwNtHS26bLB4bu2CHlnxCTzxlubRYt4vCgfoodltggFXUyOSzSKilsh8qnyOUeSQv69hJmDCBkjRwKA7P00acuEuqDr');
// Extract the lease ID from the URL parameters


router.get('/',(req,res) =>{
    const User = req.session.email; 
    console.log(User);
    res.render('leaseUpdate',{User});
});


router.post('/',(req,res) =>{
    const User = req.session.email; 
    const start = new Date(req.body.leaseStartDate);
    const end = new Date(req.body.leaseEndDate);
    const userEmail = {"userEmail" :User};
    leasePeriodsum = monthDif(start,end);
    let unitAmountUpdated;
                switch(req.body.BedRoomType){
                    case 'oneBedRoom':
                        unitAmount = 1279;
                        break;
                    case 'TwoBedRoom' :
                        unitAmount = 1679;
                        break;
                    default:
                        unitAmount = 0;
                }
                if(unitAmount === 0){
                    return res.status(404).send('Invalid Bed Room Type Selected');
                }
    const updatedData = {
        leaseStartDate: req.body.leaseStartDate,
        leaseEndDate: req.body.leaseEndDate,
        BedRoomType: req.body.BedRoomType,
        leasePeriod: leasePeriodsum,
        unitAmount: unitAmountUpdated
    };
    console.log(leasePeriodsum);
    lease.findOneAndUpdate(userEmail,updatedData,{new:true})
    .then(updatedLease =>{
        if(!updatedLease){
            return res.status(404).json({ message: 'Lease not found' })
        }
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
            success_url: `${req.headers.origin}/lease`,
            cancel_url: `${req.headers.origin}/leaseUpdate`, 
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
        res.status(500).json({ message: 'Error updating lease' });
    });
})
    

function monthDif(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}


module.exports = router;