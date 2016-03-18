var mongoose = require('../db.js');
var config = require('../config')
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var constants = {
    MODEL_NAME: 'Participante',
    COLLECTION_NAME: 'participantes'
}

//TODO dados relacionados a respostas
var schema = Schema({
    _id : {type:String, required:true},
    nome: {type:String, required:true},
    email: {type:String, required:true},
    autenticado: Boolean
}, {collection: constants.COLLECTION_NAME})

schema.statics.authenticateUser = function(numeroInscricao,cb){

    var query = {_id:numeroInscricao, autenticado: false    }

    this.findOne(query).
        exec(function(err, participante){

        if(err) return cb(err)

        if(!participante) {return cb(null,401)} //Unauthorized

        console.log(participante)

        cb(err, 200, participante)

    })

}

var Participante = mongoose.model(constants.MODEL_NAME, schema)
Participante.constants = constants

module.exports = Participante