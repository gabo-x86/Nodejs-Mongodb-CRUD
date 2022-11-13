const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
},{
    timestamps: true
});

UserSchema.methods.encryptPassword = async password => {//Función q encripta contraseña
    const salt = await bcrypt.genSalt(); //"Salto" necesario para cifrado
    return await bcrypt.hash(password, salt); //Cifradp de contraseña
}

UserSchema.methods.matchPassword = async function(password){//Función que compara contraseñas
    return bcrypt.compare(password, this.password);
}

module.exports = model('User', UserSchema); //Cuando se guarde en la BD se guardará en la colección Users(plural)