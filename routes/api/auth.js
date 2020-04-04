const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator');;
//@route GET api/auth
//@access Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await (await User.findById(req.user.id).select('-password'));
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


//@route POST api/auth
//@access Public

router.post('/', [
    
    check('email', 'Valid Email is Required ')
        .isEmail(),
    check('password', 'Password  IS REQUIRED')
        .exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        //see if user exists
        let user = await User.findOne({ email });
        if (!user) {
            res.status(500).json({ errors: [{ msg: ' Invalid Email ID' }] });
        }
        //match passwords

        const match=await bcrypt.compare(password,user.password);
        if (!match) {
            res.status(500).json({ errors: [{ msg: ' Credentials Invalid' }] });
        }
        //Return json web token
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
    } catch (error) {
        res.status(500).send('Server Error');

    }
});



module.exports = router;