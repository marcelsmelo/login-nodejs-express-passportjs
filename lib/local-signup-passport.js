const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');


module.exports = (passport) => {
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // permite passar a requisição inteira no callback
  }, function(req, email, password, done) {
    process.nextTick(function() {
        User.findOne({
          'email': email,
        }, function(err, user) {
          if (err) {
            return done(err);
          }
          if (user) {
            return done(null, false, req.flash('SignupMessage', 'Usuário já cadastrado!'));
          } else{
            var newUser = new User();
            newUser.email = email;
            newUser.password = newUser.generateHash(password);
            newUser.save((err) => {
              if (err) {
                throw err;
              }
              return done(null, newUser, true, req.flash('SignupMessage', 'Usuário cadastrado com sucesso!'));
            });
          }
        });
    });
  }));
}
