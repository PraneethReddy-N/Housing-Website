const express = require('express');
const router = express.Router();
const dash = require('./dashboards')

let communityAmenities = [
    { name: 'Pool', description: 'New Pool with Sun Shelf' },
    { name: 'Tennis Court', description: 'Full-size tennis court' },
    // ... other amenities
];

let HousingAmenities = [
    // { name: 'Pool', description: 'New Pool with Sun Shelf' },
    // { name: 'Tennis Court', description: 'Full-size tennis court' },
    {name : 'kitchen',description:'its a fucking kitchen'},
    {name : 'bathroom',description:'its a fucking bathroom'}
    
    // ... other amenities
];
router.get('/',(req,res) =>{
    res.render('amenities');
    
})

router.get('/get-amenities',(req,res) =>{
    res.json(communityAmenities);
})

router.get('/housing-amenities',(req,res) =>{
    res.json(HousingAmenities);
})

// router.get('/dashboard',(req,res) =>{
//     res.render(dash)
// })


module.exports = router;