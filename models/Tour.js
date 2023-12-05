const mongoose = require('mongoose');


const TourSchema = new mongoose.Schema({
    ApplicantName:{
        type:String
        
    },
    ApplicantEmail:{
        type:String
    },
    ApplicantNumber:{
        type:String
    },
    TourDate:{
        type:Date
    },
    TourType:{
        type:String
    },
    BedRoomType:{
        type:String
    }
});

const Tour = mongoose.model('TourDetails',TourSchema);

module.exports = Tour;