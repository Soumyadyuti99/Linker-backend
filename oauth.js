const router =  require("express").Router();
const passport = require('passport');
require('./passport.js')
require('dotenv').config();


const CLIENT_URL = 'http://localhost:3001/'

router.get('/login/success',(req, res)=>{    
    if(req.user){ 
        const token = jwt.sign({payload: {email: req.email}}, process.env.secret);               
        res.status(200).json({
            success: true,
            message: "login successful",
            token,
            user: req.user,
            // cookies: req.cookies
        })
    }
    else{
        res.status(401).json({
            success: false,
            message: "no user"
        })
    }
    
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

router.get('/google', passport.authenticate("google", {scope: ["profile"]}));

router.get('/google/callback', passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed"
}))

module.exports = router;