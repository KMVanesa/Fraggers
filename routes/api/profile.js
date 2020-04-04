const express=require('express');
const router=express.Router();
const auth =require('../../middleware/auth');

const Profile=require('../../models/Profile');
const User=require('../../models/User');
const { check, validationResult } = require('express-validator');
//@route GET api/profile
//@access Public
router.get('/me',auth,async (req,res)=>{
    try {
        const profile=await Profile.findOne({user: req.user.id}).populate('user',
        ['name','avatar']);
        if(!profile){
            return res.status(500).json({msg:'No profile found'})
        } 
        return res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route POST api/profile
//@access Public

router.get('/',[auth,[
    check('status','Status is required').not().isEmpty(),
    check('skills','Skill is required').not().isEmpty()
    ]
],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const{
        organization,
        website,
        location,
        bio,
        status,
        ign,
        skills,
        youtube,
        facebook,
        instagram,
        twitter,
        discord
    }=req.body;

    //Build Profile Object

    const profileFields={};
    profileFields.user=req.user.id; 
    if(website){
        profileFields.organization=organization;
    }
    if(location){
        profileFields.location=location;
    }
    if(bio){
        profileFields.bio=bio;
    }
    if(status){
        profileFields.status=status;
    }
    if(ign){
        profileFields.ign=ign;
    }
    if(skills){
        profileFields.skills=skills.split(',').map(skill=>skill.trim());
    }
    
    //Build Social Object
    profileFields.social={}
    if(youtube){
        profileFields.social.youtube=youtube;
    }
    if(instagram){
        profileFields.social.instagram=instagram;
    }
    if(facebook){
        profileFields.social.facebook=facebook;
    }
    if(twitter){
        profileFields.social.twitter=twitter;
    }
    if(discord){
        profileFields.social.discord=discord;
    }

    
    try {
        let profile=Profile.findOne({user:req.user.id});
        
            profile=await Profile.findOneAndUpdate(
                {user:req.user.id},
                {$set:profileFields},
                {new:true,upsert:true});
                console.log(profile);
                return res.json(profile);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});


module.exports=router;