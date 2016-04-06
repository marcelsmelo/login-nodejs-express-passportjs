const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');


module.exports = (passport) => {
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // permite passar a requisição inteira no callback
  }, function(req, email, password, done) {
    process.nextTick(function() {
        User.findOne({
            'email': email,
          }, function(err, user) {
          if(!req.user){
            if (err) {
              return done(err);
            }

            if (!user) {
              return done(null, false, req.flash('LoginMessage', 'Usuário não encontrado!'));
            }

            if (!user.checkPassword(password)) {
              return done(null, false, req.flash('LoginMessage', 'Senha incorreta!'));
            }
            return done(null, user, true, req.flash('LoginMessage', 'Login realizado com sucesso!'));
          }
        });
    });
  }));
}
