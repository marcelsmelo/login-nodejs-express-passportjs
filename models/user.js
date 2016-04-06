var mongoose = require('mongoose');
var bcrypt=require('bcrypt');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
      name: String,
      email: String,
      password: String,
      telefone: String,
      celular: String,
      facebook: {
        id:String,
        token: String,
      }
    }, {
      collection: 'user'
    });

    /*
     * Métodos pertencentes ao schema. Devem ser declarados antes da criação do modelo.
     */
    // encripta a senha
    UserSchema.methods.generateHash = (password)=>{
            return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
    };

    // Checa se a senha informada é igual a senha do banco
    UserSchema.methods.checkPassword = function (password){
        return bcrypt.compareSync(password, this.password);
    };

module.exports = mongoose.model('User', UserSchema);
