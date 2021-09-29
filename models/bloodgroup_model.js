const mongoose = require('mongoose');

const bgroup = mongoose.model('Bgroup',{
    fullname:{
        type:String
    },
    address:{
        type:String
    },
    phone:{
        type:Number
    },
    Bgroup:{
        type:String
    },
    age:{
        type:String
    },
    uimage:{
        type:String
    }
})
module.exports=bgroup;