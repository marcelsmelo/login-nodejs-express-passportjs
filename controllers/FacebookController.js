var passport = require('passport');

module.exports = {
  facebookConnect: passport.authenticate('facebook-login', {scope: ['public_profile','email']}),

  facebookCallback: passport.authenticate('facebook-login', {
          successRedirect: '/dashboard',
          failureRedirect: '/',
    }),

  facebookLink:passport.authorize('facebook-login', {
    successRedirect:'/facebook/link/callback',
    failureRedirect:'/',
    scope: ['public_profile','email']
  }),

  facebookLinkCallback:passport.authorize('facebook-login', {
      successRedirect:'/dashboard',
      failureRedirect:'/',
  }),

  facebookUnlink: function(req, res, next){
    var _user = req.user;
    _user.facebook.id = undefined;
    _user.facebook.token = undefined;
    _user.save(function(err) {
      if (err) throw err;
      res.redirect('/dashboard');
    });
  }
}
