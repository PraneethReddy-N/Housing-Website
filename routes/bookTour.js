const express = require('express');
const router = express.Router();
const Tour = require('../models/Tour');



let BedRoomDetails = [
    {name:'oneBedRoom',videoUrl:'https://www.youtube.com/embed/3wDiqlTNlfQ'},
    {name:'TwoBedRoom',videoUrl:'https://www.youtube.com/embed/nDsIy6kRhms'}
];

router.get('/BedRoomVideo',(req,res) =>{
    const{BedRoomType} = req.query;
    console.log(req.query);
    if(BedRoomType === ''){
        BedRoomType = 'oneBedRoom';
    }
    if(BedRoomType === 'oneBedRoom'){
        res.json({videoUrl:BedRoomDetails[0].videoUrl});
    }else if(BedRoomType === 'TwoBedRoom'){
        res.json({videoUrl:BedRoomDetails[1].videoUrl});
    }
    
})

router.post('/',(req,res) =>{
    const {ApplicantName,ApplicantEmail,ApplicantNumber,TourDate,TourType,BedRoomType} = req.body;
    console.log(req.body);
    let errors = [];
   //check Required Feilds
//    if(oneBedRoom === 'on'){
//     const{BedRoomType} = 'oneBedRoom'
//    }
//    else{
//     const{BedRoomType} = 'TwoBedRoom'
//    }
   console.log(BedRoomType);
    if( !ApplicantName || !ApplicantEmail || !ApplicantNumber || !TourDate || !TourType){
        errors.push({msg: 'Please fill al the feilds'});
    }
    if(errors.length > 0){
        res.render('bookTour',{
            errors,
            ApplicantName,
            ApplicantEmail,
            ApplicantNumber,
            TourDate,
            TourType,
            BedRoomType
        });
    }else{
        const TourDetails = new Tour({
            ApplicantName,
            ApplicantEmail,
            ApplicantNumber,
            TourDate,
            TourType,
            BedRoomType
        });
        console.log("in else");
        TourDetails.save()
        .then(details =>{
            req.session.message = `Your Appointment Has been Confirmed on ${details.TourDate}. We will Soon send a confirmation email to ${ApplicantEmail}
            ,Please make sure u arrive 15 mins earlier before appointment`;
            res.redirect('/bookTour');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error checking password');
        });
    }

})

// router.post('/',(req,res) =>{
    
// })


router.get('/',(req,res) =>{
    let message = '' ;
    if(req.session.message){
        message = req.session.message
        req.session.message = null;
    }
   
    res.render('bookTour',{message});
})

module.exports = router;