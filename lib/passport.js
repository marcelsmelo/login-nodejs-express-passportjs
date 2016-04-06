const passport = require('passport');
const User = require('../models/user.js');


module.exports = (passport)=>{
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user){
                        done(err,user);
      });
  });

  require('./local-login-passport.js')(passport);
  require('./local-signup-passport.js')(passport);
  require('./link-local-in-facebook.js')(passport);
  require('./facebook-strategy-passport.js')(passport);
};
