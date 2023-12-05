const express = require('express');
const router = express.Router();
const dash = require('./dashboards')

let communityAmenities = [
    { name: 'Pool', description: 'New Pool with Sun Shelf',image:'https://images.unsplash.com/photo-1700049749697-63beefb4915e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Tennis Court', description: 'Full-size tennis court',image: 'https://plus.unsplash.com/premium_photo-1699292640588-e644471efca0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D'}

    
    // ... other amenities
];

let HousingAmenities = [
    // { name: 'Pool', description: 'New Pool with Sun Shelf' },
    // { name: 'Tennis Court', description: 'Full-size tennis court' },
    {name : 'kitchen',description:'its a fucking kitchen',image:'https://plus.unsplash.com/premium_photo-1682048358672-1c5c6c9ed2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D'},
    {name : 'bathroom',description:'its a fucking bathroom',image:'https://images.unsplash.com/photo-1699968237129-b8d83b25ecd9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0MHx8fGVufDB8fHx8fA%3D%3D'}
    
    
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