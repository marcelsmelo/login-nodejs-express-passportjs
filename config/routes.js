module.exports = {
  // Caso o método da rota seja diferente de GET, utilizar o nome do método antes da rota
  //(Ex: 'POST /nome/nome2')
  '/': {
    controller: 'IndexController',
    action: 'index',
    policy: 'isLogged'
  },
  '/login': {
    controller: 'LoginController',
    action: 'login',
    policy: 'isLogged'
  },
  'POST /login': {
    controller: 'LoginController',
    action: 'logar',
    policy: 'isLogged'
  },
  '/loginFailure': {
    controller: 'LoginController',
    action: 'loginFailure'
  },
  '/logout': {
    controller: 'LoginController',
    action: 'logout',
    policy: 'isAuthenticated'
  },
  '/signup': {
    controller: 'LoginController',
    action: 'signup',
    policy: 'isLogged'
  },
  'POST /signup': {
    controller: 'LoginController',
    action: 'cadastroUser',
    policy: 'isLogged'
  },
  '/cadastroFailure': {
    controller: 'LoginController',
    action: 'cadastroFailure'
  },
  '/dashboard': {
    controller: 'DashboardController',
    action: 'index',
    policy: 'isAuthenticated'
  },

  '/local/link': {
    controller: 'LoginController',
    action: 'localLink',
    policy: 'isAuthenticated',
  },

  'POST /local/link': {
    controller: 'LoginController',
    action: 'linkAccount',
    policy: 'isAuthenticated',
  },

  '/local/unlink': {
    controller: 'LoginController',
    action: 'unlinkAccount',
    policy: 'isAuthenticated',
  },

  '/facebook/connect': {
    controller: 'FacebookController',
    action: 'facebookConnect',
  },

  '/facebook/callback': {
    controller: 'FacebookController',
    action: 'facebookCallback',
  },

  '/facebook/link': {
    controller: 'FacebookController',
    action: 'facebookLink',
    policy: 'isAuthenticated',
  },

  '/facebook/link/callback': {
    controller: 'FacebookController',
    action: 'facebookLinkCallback',
    policy: 'isAuthenticated',
  },

  '/facebook/unlink': {
    controller: 'FacebookController',
    action: 'facebookUnlink',
    policy: 'isAuthenticated',
  },
};
