const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const request = require('request');
const config = require('config');
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





//@route GET api/profile/github/:ign 
//@access Public
router.get('/github/:ign ', (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.ign}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        };
        console.log(options);
        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
            }
            if (response.statusCode != 200) {
                res.status(404).json({ msg: "No Github Profile Found" });
            }
            res.json(JSON.parse(body));
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;