var passport = require('passport');

module.exports = {
  login: (req, res, next) => {
    res.render('login');
  },

  loginFailure: (req, res, next) => {
    res.render('loginFailure');
  },

  logout: (req, res, next) => {
    req.logout(); //já fornecida pelo logout
    res.redirect('/'); //Redireciona para a raiz
  },

  logar: passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password.',
    failureFlash: true //allow flash messages
  }),

  signup: (req, res, next) => {
    res.render('signup');
  },

  cadastroFailure: (req, res, next) => {
    res.render('cadastroFailure');
  },

  cadastroUser: passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true //allow flash messages
  }),

  localLink: function(req, res, next) {
    res.render('addAccount', {user: req.user});
  },

  linkAccount: passport.authenticate('link-local-in-facebook', {
    successRedirect: '/dashboard',
    failureRedirect: '/local/link',
  }),

  unlinkAccount: function(req, res, next) {
    var _user = req.user;
    _user.password = undefined;
    _user.save(function(err) {
      if (err) throw err;
      res.redirect('/dashboard');
    });
  },
}
