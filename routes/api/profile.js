const express = require('express');
const Profile = require('../../models/Profile');
const User    = require('../../models/User');
const auth    = require('../../middleware/auth');
const router = express.Router();

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private

router.get('/me',auth, async (req, res) => {
    try {
        // We are getting Profile object (which was created with its model)
        // Then (with .populate()) we add to Profile.user 2 params - name & avatar
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({msg: 'There is no profile for this user'});
        }

        res.json(profile);
    } catch(error) {
        console.error(error);
        return res.status(500).send('Server Error!')
    }
});

module.exports = router;
