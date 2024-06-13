const express = require('express');
const router = express.Router();

const User = require('./userSchema');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.json({ message: error });
    }
});

router.post('/create', async (req, res) => {

    const { name, age, email } = req.body;

    if(!name || !age || !email) return res.json({ message: 'Please fill all the fields' });

    const emailExist = await User.findOne({ email });

    if(emailExist) return res.json({ message: 'Email already exists' });
    
    const user = new User({
        name,
        age,
        email
    });

    try {
        const saveUser = await user.save();
        res.json(saveUser);
    }
    catch (error) {
        res.json({ message: error });
    }
});

router.get('/getUser/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (error) {
        res.json({ message: error });
    }
});


router.delete('/delete/:userId', async (req, res) => {
    try {
        const removeUser = await User.remove({ _id: req.params.userId });
        res.json({
            message: 'User deleted successfully',
            removeUser
        });
    } catch (error) {
        res.json({ message: error });
    }
});

router.patch('/update/:userId', async (req, res) => {
    try {
        const updateUser = await User.updateOne(
            {_id : req.params.userId}, 
            {$set: req.body}
        );
        
        if (!updateUser) return res.json({ message: 'User not found' });

        res.json(updateUser);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;