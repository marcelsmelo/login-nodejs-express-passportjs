var User=require('../models/User.js');
var LocalStrategy=require('passport-local');

module.exports=(passport)=>{
        /*
         * Estas configurações permitem o login consistente e permamente
         */
        passport.serializeUser(function(user,done){
                done(null,user._id);
        });
        passport.deserializeUser(function(id, done){
                User.findById(id, function(err, user){
                        done(err,user);
                });
        });
        // Setup do módulo passport-local, que é chamado de estratégia. Como o passport suporta vários
        // tipos de configurações e abordagens diferentes, é recomendável nomear as estratégias.
        // Para a estratégia local, utilizaremos os nomes 'local-signup' e 'local-signin'

        passport.use('local-signup', new LocalStrategy(
           function(username,password,done){
                console.log("Aaaaqui");
                // é recomendável que todo o procedimento seja feito de forma assíncrona
                process.nextTick(function(){
                        /*
                         * Verificando se o usuário já está cadastrado
                         */
                         console.log('Email: '+username);
                         console.log("PASS: "+password);
                        User.findOne({'auth.local.username':username}, function(err,user){
                                if(err) done(err);
                                // se o usuário existir, exibe uma mensagem de erro.
                                if(user){
                                        return done(null, false, req.flash('signupMessage', 'Este e-mail já está sendo utilizado.'));
                                }else{

                                        // caso contrário, crie o novo usuário.
                                        var newUser=new User();
                                        newUser.auth.local.username=email;
                                        newUser.auth.local.password=newUser.generateHash(password); // a senha deve ser encriptada antes da gravação no banco.
      console.log(newUser);
                                        newUser.save(function(err){
                                                if(err) throw err;
                                                return done(null, newUser, true, req.flash('signupMessage', 'Usuário cadastrado com sucesso.'));
                                        });
                                }
                        });
                });
        })); // fim da estratégia para o signup.
};
