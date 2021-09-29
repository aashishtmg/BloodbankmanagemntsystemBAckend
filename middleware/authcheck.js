//the function of the guard
const jwt = require('jsonwebtoken');
const { findOne } = require('../models/bloodgroup_model');
const Registration = require('../models/registration_model');

//main guard
module.exports.verifyuser = function(req,res,next){
    try{
        const token = req.headers.authorization. split(" ")[1];
        const data = jwt.verify(token,'secretkey');
        //console.log(data.registrationID);

        Registration.findOne({_id:data.registrationID})
        .then(function(result){
            req.userdetail = result; //all the details of the user
            next();
        })
        .catch(function(e){
            res.status(401).json({error:e})
        })
    }
    catch(e){
        res.status(401).json({error:e})
    }
    
}

//this is for single table

// second guard
module.exports.verifydonor = function(req,res,next){
    if(!req.userdetail){
        return res.status(401).json({message:"Invalid User!"});   
       }
       else if(req.userdetail.userType!=='Donor'){
           return res.status(401).json({message:"Unauthorized!!"});
       }
       next();
}

module.exports.verifyclient = function(req,res,next){
    if(!req.userdetail){
        return res.status(401).json({message:"Invalid User!"});   
       }
       else if(req.userdetail.userType!=='Client'){
           return res.status(401).json({message:"Unauthorized!!"});
       }
       next();
}

//if we have different tables we have to make main guard according to the table like this
//const admin = require('../models/admin_model');
//const donor = require('../models/donor_model');
//const client = require('../models/client_model');

//this is for admin guard

// module.exports.verifyadmin = function(req,res,next){
//     try{
//         const token = req.headers.authorization. split(" ")[1];
//         const data = jwt.verify(token,'secretkey');
//         //console.log(data.registrationID);

//         admin.findOne({_id:data.registrationID})
//         .then(function(result){
//             req.userdetail = result; //all the details of the user
//             next();
//         })
//         .catch(function(e){
//             res.status(401).json({error:e})
//         })
//     }
//     catch(e){
//         res.status(401).json({error:e})
//     }  
// }

//this is for donor guard

// module.exports.verifydonor = function(req,res,next){
//     try{
//         const token = req.headers.authorization. split(" ")[1];
//         const data = jwt.verify(token,'secretkey');
//         //console.log(data.registrationID);

//         donor.findOne({_id:data.registrationID})
//         .then(function(result){
//             req.userdetail = result; //all the details of the user
//             next();
//         })
//         .catch(function(e){
//             res.status(401).json({error:e})
//         })
//     }
//     catch(e){
//         res.status(401).json({error:e})
//     }
    
// }

//this is for client guard

// module.exports.verifyclient = function(req,res,next){
//     try{
//         const token = req.headers.authorization. split(" ")[1];
//         const data = jwt.verify(token,'secretkey');
//         //console.log(data.registrationID);

//         admin.findOne({_id:data.registrationID})
//         .then(function(result){
//             req.userdetail = result; //all the details of the user
//             next();
//         })
//         .catch(function(e){
//             res.status(401).json({error:e})
//         })
//     }
//     catch(e){
//         res.status(401).json({error:e})
//     }
    
// }



// at last
//then we have to move to different routes and provide single, single guard according to the routes and models
