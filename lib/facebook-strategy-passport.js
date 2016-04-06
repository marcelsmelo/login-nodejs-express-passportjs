const FacebookStrategy=require('passport-facebook').Strategy;
const User = require('../models/user.js');
const config = require('../config/config.js');

module.exports = (passport) => {
  passport.use('facebook-login', new FacebookStrategy({
     clientID: config.facebook.consumer_key,
     clientSecret: config.facebook.consumer_secret,
     callbackURL: config.facebook.callback_url,
     passReqToCallback: true,
     profileFields: ['id', 'emails', 'name', 'displayName']
 }, function(req,token, refreshToken, profile, done){
   console.log(profile);
     process.nextTick(function(){
             User.findOne({'facebook.id':profile.id}, function(err, user){
              if(!req.user){
                 if(err) return done(err);
                 if(user){
                     return done(null, user);
                 }else{
                     var newUser=new User();
                     newUser.facebook.id=profile.id;
                     newUser.facebook.token=token;
                     newUser.email=profile.emails[0].value;
                     newUser.name=profile.displayName;
                     newUser.save(function(err){
                         if(err) throw err;
                         return done(null, newUser)
                     });
                 }
               }else{
                 var _user = req.user;
                 _user.name = profile.displayName;
                 _user.facebook.id = profile.id;
                 _user.facebook.token = token;
                 _user.name = profile.displayName;
                 _user.save(function(err) {
                   if (err) throw err;
                   if(user) user.remove();
                   return done(null, _user);
                 });
               }
             });

     });
 }));
}
