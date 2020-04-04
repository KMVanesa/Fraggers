const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
//@route GET api/profile/me
//@access Public
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user',
            ['name', 'avatar']);
        res.json(profile)
        if (!profile) {
            return res.status(500).json({ msg: 'No profile found' })
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route POST api/profile
//@access Public

router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skill is required').not().isEmpty()
]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {
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
    } = req.body;

    //Build Profile Object

    const profileFields = {};
    profileFields.user = req.user.id;
    if (website) {
        profileFields.organization = organization;
    }
    if (location) {
        profileFields.location = location;
    }
    if (bio) {
        profileFields.bio = bio;
    }
    if (status) {
        profileFields.status = status;
    }
    if (ign) {
        profileFields.ign = ign;
    }
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    //Build Social Object
    profileFields.social = {}
    if (youtube) {
        profileFields.social.youtube = youtube;
    }
    if (instagram) {
        profileFields.social.instagram = instagram;
    }
    if (facebook) {
        profileFields.social.facebook = facebook;
    }
    if (twitter) {
        profileFields.social.twitter = twitter;
    }
    if (discord) {
        profileFields.social.discord = discord;
    }


    try {
        let profile = Profile.findOne({ user: req.user.id });

        profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true, upsert: true });
        console.log(profile);
        return res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});


//@route GET api/profile
//@access Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user',
            ['name', 'avatar']);
        res.json(profiles)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route GET api/profile/user/:userid
//@access Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id
        }).populate('user', ['name', 'avatar']);

        if (!profile) return res.status(400).json({ msg: 'No Profile for this user' });

        res.json(profile);
    } catch (err) {
        //console.error(err.name);
        if (err.name == 'CastError') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});



//@route DELETE api/profile/
//@access Private
router.delete('/', auth, async (req, res) => {
    try {
        // Remove user posts
        
        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove user
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route PUT api/profile/experience
//@access Private
router.put('/experience', [auth,[
        check('title','Title is required').not().isEmpty(),
        check('organization','Organization is required').not().isEmpty(),
        check('from','From date is required').not().isEmpty()
    ]], async (req, res) => {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors:errors.array() });
        }

        const{
            title,
            organization,
            location,
            from,
            to,
            current,
            description
        }=req.body;

        const newExp={
            title,
            organization,
            location,
            from,
            to,
            current,
            description
        }

    try {
        const profile=await Profile.findOne({user:req.user.id});
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



//@route DELETE  api/profile/experience/exp_id
//@access Private
router.delete('/experience/:exp_id',auth, async (req, res) => {
    try {
        const profile= await Profile.findOne({ user: req.user.id });
        //Get Remove Index
        const removeIndex=profile.experience.map(item=>item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex,1)
        await profile.save(); 
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route PUT api/profile/education
//@access Private
router.put('/education', [auth,[
    check('school','school is required').not().isEmpty(),
    check('degree','degree is required').not().isEmpty(),
    check('from','From date is required').not().isEmpty()
]], async (req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
    }

    const{
        school,
        degree,
        field_of_study,
        from,
        to,
        current,
        description
    }=req.body;

    const newExp={
        school,
        degree,
        field_of_study,
        from,
        to,
        current,
        description
    }

try {
    const profile=await Profile.findOne({user:req.user.id});
    profile.education .unshift(newExp);
    await profile.save();
    res.json(profile)
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
});



//@route DELETE  api/profile/education/edu_id
//@access Private
router.delete('/education/:edu_id',auth, async (req, res) => {
try {
    const profile= await Profile.findOne({ user: req.user.id });
    //Get Remove Index
    const removeIndex=profile.education.map(item=>item.id).indexOf(req.params.edu_id);
    profile.education.splice(removeIndex,1)
    await profile.save(); 
    res.json(profile);
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
});


module.exports = router;