const express = require('express');
const Registration = require('../models/registration_model');
const router = express.Router();

//validation for our user data
const{check, validationResult} =require('express-validator');
//for password encryption
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');


//insert
router.post('/bloodbank/client/register',[
    check('username','Username is required!!').not().isEmpty(),
    check('email','Email is required!!').isEmail(),
    check('password','Password is required!!').not().isEmpty()
], function(req,res){
    const validationErr = validationResult(req);
    
    //res.send(validationErr.array());

    if(validationErr.isEmpty())
    {
        //valid
    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username;
    const address = req.body.address;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const userType = req.body.userType;
        bcryptjs.hash(password,10,function(err,hash_pwd){
                const data = new Registration(
                    {fname:fname,
                        lname:lname,
                        username:username,
                        address:address,
                        email:email,
                        phone:phone,
                        password:hash_pwd,
                        userType:userType
                    });
                    data.save()
                    .then(function(result){
                        res.status(201).json({success:true,
                        message:"User registered successfully!!"})
                    })
                    .catch(function(eror){
                        res.status(500).json({message:eror})
                    })
        })
        //valid
    }
    else
    {
        //invalid
        res.status(400).json(validationErr.array());
    }
})

router.post('/bloodbank/client/login',function(req,res){
    const username = req.body.username; //from form/client
    const password = req.body.password; //from client//client
console.log(req.body);
//check username is valid or not
    Registration.findOne({username:username})
    .then(function(userdata){
        if(userdata===null){
            //if user didn't find in database
          return  res.status(403).json({message:"Login Failed!!"})
        }
        //user match in database
        bcryptjs.compare(password,userdata.password,function(err,resu){

            if(resu===false){
                return res.status(403).json({message:"Login Failed!!"})
            }

            // if username and password is valid
            //generating token

            const token = jwt.sign({registrationID : userdata._id},'secretkey')
            res.status(200).json({
                success:true,
                token:token,
                message:"login success", userType: userdata.userType
            })
        })
    })
    .catch(function(e){
        res.status(500).json({error:e});
    })
})

module.exports=router;