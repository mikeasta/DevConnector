const express = require('express');
const {check, validationResult} = require('express-validator');
const Profile = require('../../models/Profile');
const User    = require('../../models/User');
const auth    = require('../../middleware/auth');
const router = express.Router();

// @route   GET api/profile/me
// @desc    Get current users profile
//          Just getting user.id from the request (using middleware),
//          make a promise via Profile.findOne() and then send our 
//          profile object as response
// @access  Private

router.get('/me', auth, async (req, res) => {
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


// @route   POST api/profile
// @desc    Create/update users profile
//          1. Require 'status' & 'skills' to be.
//          2. Check for our validation
//          3. Getting profile props from req.body
//          4. Define our profile fields object, add a 'user' prop
//          5. Build profile object
//          6. Check for profile existing. Update or create new.
// @access  Private

router.post('/',[
    auth,
    [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills is required').not().isEmpty()
    ]],  async (req, res) => {
        // Validation
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json( { errors: errors.array() } )
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        // Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;

        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (githubusername) profileFields.githubusername = githubusername;
        if (status) profileFields.status = status;
        if (skills)  {
            profileFields.skills = skills.split(',').map(skill => {
                return skill.trim();
            })
        }

        // Build social object
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

        try {
            let profile = await Profile.findOne({user: req.user.id});

            if (profile) {
                // Update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id }, 
                    { $set: profileFields }, 
                    { new: true }
                );

                return res.json(profile);
            }

            // Create
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);
        } catch(error) {
            console.error(error);
            return res.status(500).send('Server Error!');
        }
    }
);


// @route   GET api/profile
// @desc    Get all users profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles)
    } catch(err) {
        console.error(err);
        res.status(500).send('Server Error!')
    }
});


// @route   GET api/profile/user/:user_id
// @desc    Get special user's profile (by ID)
// @access  Public
router.get('/user/:user_id',  async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.json(profile)
    } catch(err) {
        console.error(err);
        // If profile id is not valid but server works correctly
        if (err.kind == 'ObjectId') {
            return res.status(400).json({msg: 'Profile not found'});
        } else {
            return res.status(500).send('Server Error!');
        }
    }
});


// @route   DELETE api/profile
// @desc    Delete profile
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        // to-do - remove users posts

        // Remove profile
        await Profile.findOneAndRemove({user: req.user.id});
        
        // Remove user
        await User.findOneAndRemove({_id: req.user.id});


        res.json({ msg: 'User removed'})
    } catch(err) {
        console.error(err);
        res.status(500).send('Server Error!')
    }
});

// @route   PUT api/profile/experience
// @desc    Add profile expirience
// @access  Private
router.put('/experience', [
    auth,
    [
        check('title', 'Title is required')
            .not()
            .isEmpty(),
        check('company', 'Company is required')
            .not()
            .isEmpty(),
        check('from', 'from date is required')
            .not()
            .isEmpty(),
    ]], 
    async (req, res) => {
        // Validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        
        const {
            title, 
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }

        try {
            const profile = await Profile.findOne( {user: req.user.id} );
            profile.experience.unshift(newExp);
            await profile.save();
            res.json(profile)
        } catch (err) {
            console.error(err);
            return res.status(500).send('Server Error!')
        }
})

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete profile experience
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});
        
        // Get remove index
        const removeIndex = profile.experience
            .map( item => item.id)
            .indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server Error!')
    }

})


// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put('/education', [
    auth,
    [
        check('school', 'School is required')
            .not()
            .isEmpty(),
        check('degree', 'Degree is required')
            .not()
            .isEmpty(),
        check('fieldofstudy', 'Field of study is required')
            .not()
            .isEmpty(),
        check('from', 'from date is required')
            .not()
            .isEmpty(),
    ]], 
    async (req, res) => {
        // Validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        
        const {
            school, 
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body;

        const newEd = {
            school, 
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        }

        try {
            const profile = await Profile.findOne( {user: req.user.id} );
            profile.education.unshift(newEd);
            await profile.save();
            res.json(profile)
        } catch (err) {
            console.error(err);
            return res.status(500).send('Server Error!')
        }
})

// @route   DELETE api/profile/education/:ed_id
// @desc    Delete profile education
// @access  Private
router.delete('/education/:ed_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});
        
        // Get remove index
        const removeIndex = profile.education
            .map( item => item.id)
            .indexOf(req.params.ed_id);

        profile.education.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server Error!')
    }

})
module.exports = router;