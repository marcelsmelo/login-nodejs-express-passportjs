var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var schema = mongoose.Schema({
  auth:{
    local:{
        username: String,
        password: String
    }
  }
});

/*
 * Métodos pertencentes ao schema. Devem ser declarados antes da criação do modelo.
 */
// encripta a senha
schema.methods.generateHash=function(password){
        return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};

// Checa se a senha informada é igual a senha do banco
schema.methods.checkPassword=function(password){
        return bcrypt.compareSync(password, this.auth.local.password);
};

// Cria o modelo, o que equivale a criação do documento no banco.
var User=mongoose.model('User', schema);



module.exports=User;
