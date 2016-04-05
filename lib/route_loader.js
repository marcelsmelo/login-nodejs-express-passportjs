module.exports=function(app){
	const routes=require('../config/routes');
	const fs=require('fs');

	const controllers_folder=__dirname+'/../controllers';

	for(var k in routes){
		var route=routes[k];

		//separando a chave por espaços, para pegar o método
		var url="";
		var method="";

		var k_array=k.split(/\s+/);
		if(k_array.length==1){
			url=k_array[0];
			method="get";
		}else if(k_array.length==2){
			method=k_array[0].toLowerCase();
			url=k_array[1];
		}else{
			throw new Error("Rota "+k+" -> "+route+" não está seguindo o padrão");
		}


		var controller_filename=route.controller;
		var action_name=route.action;

		console.log("Controller: "+controller_filename);
		console.log("Action: "+action_name);
		console.log("URL: "+url);
		console.log("Method: "+method);
		console.log("END");

		// carregando a rota
		var controller=require(controllers_folder+"/"+controller_filename+".js");
		app[method](url, controller[action_name]);
	}
};
