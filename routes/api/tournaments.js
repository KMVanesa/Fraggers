const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Tournament = require('../../models/Tournaments');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User')

//@route POST api/tournaments 
//@access Private
router.post(
    '/', [auth, [check('text', 'Text is required')
        .not()
        .isEmpty()
    ]], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');

            const newTournament = new Tournament({
                text: req.body.text,
                name: req.body.name,
                user: req.user.id,
                from: req.body.from,
                pricepool: req.body.pricepool,
                game: req.body.game,
                to: req.body.to,
                entry_fees: req.body.entry_fees
            });

            const tournament = await newTournament.save();

            res.json(tournament);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    GET api/tournaments
// @desc     Get all tournaments
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const tournaments = await Tournament.find().sort({ date: -1 });
        res.json(tournaments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/tournaments/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id);

        // Check for ObjectId format and post
        if (!tournament) {
            return res.status(404).json({ msg: 'Tournament not found' });
        }

        res.json(tournament);
    } catch (err) {
        if (err.name == 'CastError') {
            return res.status(400).json({ msg: 'Tournament not found' });
        }

        res.status(500).send('Server Error');
    }
});



// @route    DELETE api/tournaments/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id);

        // Check for ObjectId format and post
        if (!tournament) {
            return res.status(404).json({ msg: 'Tournament not found' });
        }
        // Check user
        if (tournament.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await tournament.remove();

        res.json({ msg: 'Tournament removed' });
    } catch (err) {
        if (err.name == 'CastError') {
            return res.status(400).json({ msg: 'tournament not found' });
        }
        res.status(500).send('Server Error');
    }
});


// @route    PUT api/tournaments/participant/:id
// @desc     Like a post
// @access   Private
router.put('/participant/:id', auth, async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id);
        if (
            tournament.user.toString() === req.user.id
        ) {
            return res.status(400).json({ msg: 'Owner Cannot  Participate' });
        }
        // Check if the post has already been liked
        if (
            tournament.participants.filter(participant => participant.user.toString() === req.user.id).length > 0
        ) {
            return res.status(400).json({ msg: 'User Already Participated' });
        }

        tournament.participants.unshift({ user: req.user.id });

        await tournament.save();

        res.json(tournament.participants);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route    PUT api/tournaments/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if the post has already been liked
        if (
            post.likes.filter(like => like.user.toString() === req.user.id).length ===
            0
        ) {
            return res.status(400).json({ msg: 'Post has not yet been liked' });
        }

        // Get remove index
        const removeIndex = post.likes
            .map(like => like.user.toString())
            .indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes);
    } catch (err) {
        //console.error(err.message);
        res.status(500).send('Server Error');
    }
});





module.exports = router;