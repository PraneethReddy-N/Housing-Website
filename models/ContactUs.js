const mongoose = require('mongoose');

const ContactUsSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    Message:{
        type:String
    }

});

const contactUs = mongoose.model('ContactUs',ContactUsSchema);

module.exports = contactUs;

