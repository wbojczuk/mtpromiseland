const express = require("express");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const path = require("path");
const router = express.Router();
const bcrypt = require("bcrypt");

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

passport.use(new LocalStrategy(async function verify(username, password, cb) {
  bcrypt.compare(password, "$2b$10$zGRhEHwWUG75POeii11CE.5XodkOoCUfVmgL.ENaB9yZ7NZO9KdU6")
  .then((res)=>{
    if(res){
      return cb(null, {username: username, password: password}); 
    }else{
      return cb(null, false)
    }
  })
  }));

  router.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname + "../.." + "/secure/login.html"))
  })

  router.post('/password', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
  }));

  

  module.exports = router;