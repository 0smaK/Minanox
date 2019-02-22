const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/registrarse', (req,res) => {
  res.render('auth/registrarse');
});

router.post('/registrarse', passport.authenticate('local.registrarse', {
  successRedirect: '/play',
  failureRedirect: '/registrarse',
  failureFlash: true
}));

router.get('/login', (req,res) => {
    res.render('auth/login');
});

router.post('/login', (req, res, next) => {
  req.checkBody('username', 'Username is Required').notEmpty();
  req.checkBody('password', 'Password is Required').notEmpty();
  const errors = req.validationErrors();
  if (errors.length > 0) {
    req.flash('message', errors[0].msg);
    res.redirect('/signin');
  }
  passport.authenticate('local.login', {
    successRedirect: '/play',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});


module.exports = router;