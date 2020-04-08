const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const { check, validationResult } = require('express-validator');

//@route PUT api/profile/achievements
//@access Private
router.put('/', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('game', 'Game is required').not().isEmpty(),
    check('position', ' Position is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        title,
        game,
        location,
        position,
        description
    } = req.body;

    const newAchieve = {
        title,
        game,
        location,
        position,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.achievements.unshift(newAchieve);
        await profile.save();
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



//@route DELETE  api/profile/experience/exp_id
//@access Private
router.delete('/:ach_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        //Get Remove Index
        const removeIndex = profile.achievements.map(item => item.id).indexOf(req.params.ach_id);
        profile.achievements.splice(removeIndex, 1)
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
