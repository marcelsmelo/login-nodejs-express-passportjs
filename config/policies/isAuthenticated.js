module.exports=function(req,res,next){
        if(req.isAuthenticated()){
                // avança para a próxima função da rota, que será a função principal.
                return next();
        }else{
                // avança para a próxima ROTA. Como não existe uma rota encadeada nem um redirect,
                // a próxima rota é a 404 (page not found), que serve para os nossos propósitos de bloqueio.
                return next('route');
        }
};
