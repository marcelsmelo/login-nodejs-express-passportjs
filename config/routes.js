module.exports={                                                                                          // Caso o método da rota seja diferente de GET, utilizar o nome do método antes da rota (Ex: 'POST /nome/nome2')
        '/':{
                controller:'IndexController',
                action:'index',
        },
        '/users':{
                controller:'UsersController',
                action:'index',
        },
        '/local/signin':{
            controller:'LoginController',
            action:'signin'
        },
        '/local/signup':{
          controller: 'LoginController',
          action:'signup'
        },
        'POST /local/signup':{
          controller: 'LoginController',
          action: 'cadastroUsuario'
        }
};
