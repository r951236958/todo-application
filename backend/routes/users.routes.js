const router = require('express').Router();
let User = require('../models/users.models');

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error :'+err));
})

router.route('/login').post((req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username: username }, (err, user) => {
        if(err){
            res.status(400).json('Error: '+err);
        }
        user.comparePassword(password, (err, isMatch) =>{
            if(err){
                res.status(400).json('Error: '+err);
            }
            if(isMatch){
                res.json(user.token);
            }
            else{
                res.status(400).json('Password not Match');
            }
        })
    });
});

router.route('/register').post((req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const token = req.body.token;
    const newUser = new User ({
        username: username,
        password: password,
        token: token,
    });
    newUser.save()
    .then(res.json('User Added!'))
    .catch(err => res.status(400).json('Error :'+err));
})

module.exports = router;