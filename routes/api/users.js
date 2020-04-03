const express=require('express');
const router=express.Router();
const gravatar=require('gravatar');
const bcrypt=require('bcryptjs')
const{check,validationResult}=require('express-validator'); 

const User=require('../../models/User');

//@route POST api/users
//@access Public
router.post('/',[
    check('name','Name is Required')
    .not()
    .isEmpty(),
    check('email','Valid Email is Required ')
    .isEmail(),
    check('password','Password should be more than 5 characters')
    .isLength({min:6 })
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()}); 
    }

    const { name, email , password } = req.body; 

    try {
        //see if user exists
        let user=await User.findOne( {email});
        if(user){
            res.status(400).json({errors:[{msg: 'User Already Exists'}]}); 
        }

        //GET users gravatar
        const avatar = gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        });
        //set user schema
        user=new User({
            name,
            email,
            password,
            avatar
        });
        //encrypt the password
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);
        await user.save();
        //Return json web token
        res.send('User Registered');
    } catch (error) {
        res.status(500).send('Server Error'); 

    }    
});

module.exports=router;