const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const pool = require('./pool.js');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {    
    
        // Your authentication and user creation logic here
        // 'profile' contains user information from Google        
        const profileId = parseInt(profile.id)        
        const user = await pool.query('SELECT * FROM "User" WHERE ID = $1', [profileId]);               
        if(user.rows.length !== 0){            
            done(null, user.rows[0])
        }
        else{                     
            const email = profile.emails[0].value;                       
            let query = await pool.query('INSERT INTO "User" (ID,email) VALUES ($1,$2)', [profileId, email])
            done(null, { email: email});
        }    
  }
));

passport.serializeUser((user, done)=>{       
    done(null, user.email)
})

passport.deserializeUser(async(email, done)=>{
    const user = await pool.query('SELECT * FROM "User" WHERE email = $1', [email]);
    if (user.rows.length !== 0) {
        // Pass the user object to done
        done(null, user.rows[0]);
    } else {
        // User not found in the database, handle it as needed
        done(null, false);
    }
})