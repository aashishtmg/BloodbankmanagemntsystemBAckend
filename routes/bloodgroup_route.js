const express = require('express');
const bgroup = require('../models/bloodgroup_model');
const router = express.Router();
const authcheck = require('../middleware/authcheck');

router.post('/bgroup/insert',authcheck.verifyuser,function(req,res){

    const fullname = req.body.fullname;
    const address = req.body.address;
    const phone = req.body.phone;
    const Bgroup = req.body.Bgroup;
    const age = req.body.age;
    const uimage = req.body.uimage;

    console.log(req.body);    
    const data = new bgroup({
        fullname:fullname,
        address:address,
        phone:phone,
        Bgroup:Bgroup,
        age:age,
        uimage:uimage
        });

    data.save()
    .then(function(result){
        res.status(201).json({success:true, message:"Blood Group Added Succesfully!!"})
    })
    .catch(function(e){
        res.status(500).json({err:e})
    })
})

//use put for update data
router.put('/bgroup/update/:id',authcheck.verifyuser,function(req,res){
    const fullname = req.body.fullname;
    const address = req.body.address;
    const phone = req.body.phone;
    const Bgroup = req.body.Bgroup;
    const age = req.body.age;
    const id = req.params.id;
    

    bgroup.findOneAndUpdate({_id:id},{fullname:fullname,address:address,phone:phone,Bgroup:Bgroup,age:age},{new:true})
    .then(function(result){
        
        res.status(200).json({status:true,message:"Information updated successfully!!"})
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })
})

//use delete for delete data
router.delete('/bgroup/delete/:id',authcheck.verifyuser,function(req,res){
    const id = req.params.id;
    bgroup.deleteOne({_id:id})
    .then(function(result){
        
        if(result.deletedCount==0){
            return res.status(500).json({status:true,message:"Id not valid"})    
        }
        res.status(200).json({status:true,message:"Deleted succesfully"})
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })
})

//use get for display all bgroup
router.get("/bgroup/all",authcheck.verifyuser,function(req,res){
    bgroup.find()
    .then(function(data){
        res.status(200).json({success:true,data});
    })
    .catch(function(er){
        res.status(500).json({erroe:er, success:true})
    })
})

router.get("/bgroup/single/:id",authcheck.verifyuser,function(req,res){
    const id = req.params.id;
    bgroup.findOne({_id : id})
    .then(function(data){
        res.status(200).json({data,success:true});
    })
    .catch(function(er){
        res.status(500).json({erroe:er})
    })
})

module.exports=router;