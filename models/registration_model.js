const mongoose = require('mongoose');

const Registration = mongoose.model('Registration',{
    fname:{
        type:String
    },
    lname:{
        type:String
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        enum :['Donor','Client'],
        default:'Client'
    }

})

module.exports=Registration;