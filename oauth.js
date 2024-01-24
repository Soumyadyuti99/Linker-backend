const router =  require("express").Router();
const passport = require('passport');
require('./passport.js')
require('dotenv').config();
const jwt = require("jsonwebtoken");

const CLIENT_URL = 'http://localhost:5174/'

router.get('/login/success',(req, res)=>{    
    const token = jwt.sign({payload: {email: req.email}}, process.env.secret);               
    res.status(200).json({
        success: true,
        message: "login successful",
        token,
        // cookies: req.cookies
    })
})

router.get('/logout', (req, res)=>{    
    req.logout();
    res.redirect(CLIENT_URL);
})

router.get('/login/failed',(req, res)=>{
    res.status(401).json({
        success: false,
        message: "login failure"
    })
})

router.get('/google', passport.authenticate("google", {scope: ['https://www.googleapis.com/auth/userinfo.profile',
'https://www.googleapis.com/auth/userinfo.email']}));

router.get('/google/callback', passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed"
}))

module.exports = router;