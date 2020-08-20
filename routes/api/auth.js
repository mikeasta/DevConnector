const express = require('express');
const auth    = require('../../middleware/auth');
const User    = require('../../models/User');
const {check, validationResult} = require('express-validator');
const bcrypt    = require('bcryptjs');
const jwt       = require('jsonwebtoken');
const config    = require('config');

const router = express.Router();

// @route   GET api/auth
// @desc    Get user data
// @access  Public

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); 
        res.json(user);
    } catch(error) {
        console.error(error.message);
        return res
                .status(500)
                .send('Server Error!');
    }
});


// @route   POST api/auth
// @desc    Authenicate user ==> get token
// @access  Public

router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
    ], 
    async (req, res) => {
        // Validation logic
        const errors = validationResult(req);
        if(!errors.isEmpty() ) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {email, password} = req.body;
        try {
            // Check if user already exists
            let user = await User.findOne({email});
            if (!user) {
                return res
                    .status(400)
                    .json({ 
                        errors: [ { 
                            msg: 'Invalid Credentials' 
                        } ]
                    }
                );
            }

            // Check if passwords are the same
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ 
                        errors: [ { 
                            msg: 'Invalid Credentials' 
                        } ]
                    }
                );
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload, 
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (error, token) => {
                    if (error) throw error;
                    res.json({ token });
            });

        } catch(error) {
            console.error(error.message)
            return res.status(500).send('Server Error!');
        }
});

module.exports = router;
