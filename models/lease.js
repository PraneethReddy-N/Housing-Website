const mongoose = require('mongoose');
const User = require('./User');

const leaseSchema = mongoose.Schema({
    leaseStartDate:{
        type:Date,
        required:true
    },
    leaseEndDate:{
        type:Date,
        required:true
    },
    leasePeriod:{
        type:String
    },
    AnyId:{
        type:String
    },
    image:{
        type:Buffer
    },
    BedRoomType:{
        type:String
    },
    unitAmount:{
        type:Number
    },
    userEmail:{
        type:String,
        required:true,
        ref:'User'
    },
    
});

const lease = mongoose.model('leaseDetails',leaseSchema);

module.exports = lease;
