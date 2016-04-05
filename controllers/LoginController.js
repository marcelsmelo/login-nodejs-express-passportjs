var passport = require('passport');

var LoginController ={
  signin:(req, res) =>{
    res.render('signin');
  },

  signup: (req, res) =>{
    res.render('signup');
  },

  cadastroUsuario: passport.authenticate('local-signup',{
        successRedirect:'/dashboard', // em caso de sucesso, redirecione para esta rota.
        failureRedirect:'/local/teste', // Em caso de falha, redirecione para esta rota
        failureFlash:true //allow flash messages
  }),
}

module.exports = LoginController;
