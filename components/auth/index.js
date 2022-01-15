const express = require('express');
const router = express.Router();
const passport = require('./passport');
const {models} = require('../../models');
const authService = require('./authService');
const bcrypt = require('bcrypt');


router.get('/login', (req, res) => {
    res.render('auth/login',{wrongLogin: req.query.wrongLogin !== undefined});
});

router.post('/login', 
    passport.authenticate('local', { 
        successRedirect: '/',
        failureRedirect: '/auth/login?wrongLogin'
    })
);

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async(req,res) => {
    const {username, password, firstname, email, phone} = req.body;
    try {    
        const account = await authService.register(username, password, firstname, email, phone);
        if(account){
            return res.render('auth/register',{message: 'Success'});
        }
        else {
            return res.render('auth/register',{message: 'Account is existed !!! Try again!'});
        }
    }
    catch(err){
        return res.render('auth/register',{message: 'Account is existed !!! Try again!'});;
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


router.get('/profile', async(req, res) => {
    if(req.user){
        const customer = await models.customer.findOne({ where: {id: req.user.userID}, raw: true });
        res.render('auth/profile', {customer});
    } else{
        res.redirect('/');
    }
});

router.post('/updateProfile/:id', async(req, res) => {
    try {
        await models.customer.update(
            {
                first_name: req.body.firstname,
                last_name: req.body.lastname,
                telephone: req.body.telephone,
                email: req.body.email
            },
            { where: { id: req.params.id } }
        );
        res.redirect('/auth/profile');
    } catch(err){
        res.render('auth/profile', {message: 'Something went wrong !!!'});
    }
});

router.post('/changePassword/:id', async(req, res) => {
    try {
        const customer = await models.customer.findOne({ where: {id: req.params.id}, raw: true });
        const match = await bcrypt.compare(req.body.currentPassword,customer.password);
        if(match){
            const hashPassword = await bcrypt.hash(req.body.newPassword, 10);
            await models.customer.update(
                { password: hashPassword },
                { where: { id: req.params.id } }
            );
            res.redirect('/auth/profile');
        }
        else{
            res.render('auth/profile', {message: 'Current Password is incorrect !!!'});
        }
    } catch(err){
        res.render('auth/profile', {message: 'Something went wrong !!!'});
    }
});

module.exports = router;