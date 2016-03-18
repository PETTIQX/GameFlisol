var mongoose = require('../db.js')
var Schema = mongoose.Schema
ObjectId = Schema.ObjectId

var constants = {
    MODEL_NAME: 'Questionario',
    COLLECTION_NAME: 'questionarios'
}

var schema = Schema({

    questoes: [
        {
            _id: {type:String, defaut: mongoose.Types.ObjectId()},
            enunciado: String,
            opcoes: [{idOpcao:Number, descricao: String}],
            respostaCorreta: {idOpcao: Number, descricao: String},
            pontuacao: Number
        }
    ],
    sala : String,
    senha: String
}, {collection: constants.COLLECTION_NAME})

var Questionario = mongoose.model(constants.MODEL_NAME, schema)
Questionario.constants = constants

module.exports = Questionario