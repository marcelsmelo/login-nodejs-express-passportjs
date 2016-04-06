const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');


module.exports = (passport) => {
  passport.use('link-local-in-facebook', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // permite passar a requisição inteira no callback
  }, function(req, email, password, done) {
    process.nextTick(function() {
      User.findOne({
        'email': email,
      }, function(err, user) {
        if (req.user) {
          if (!user || (user && !user.password)) {
            var _user = req.user;
            _user.email = email;
            _user.password = _user.generateHash(password);
            _user.save(function(err) {
              if (err) throw err;
              return done(null, _user, true, req.flash('signupMessage', 'Usuário atualizado.'));
            });
          } else {
            if (user && user.checkPassword(password)) {
              var _user = req.user;
              _user.email = email;
              _user.password = _user.generateHash(password);
              _user.save(function(err) {
                user.remove();
                if (err) throw err;
                return done(null, _user, true, req.flash('signupMessage', 'Usuário atualizado.'));
              });
            } else {
              return done(null, req.user, true, req.flash('signupMessage', 'Senha incorreta.'));
            }
          }
        }
      });
    });
  }));
}
