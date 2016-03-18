var mongoose = require('../db.js')
var Schema = mongoose.Schema
ObjectId = Schema.ObjectId

var constants = {
    MODEL_NAME: 'Resposta',
    COLLECTION_NAME: 'respostas'
}

var schema = Schema({
    usuario: String, //número inscrição
    respostaQuestionario: {
        slotQuestionario: ObjectId,
        respostas: [
            {
                idQuestao: ObjectId,
                resposta: Number, //idOpção
                correta: boolean
            }
        ]
    },
    pontuacao: Number
}, {collection: constants.COLLECTION_NAME})

var Slot = mongoose.model(constants.MODEL_NAME, schema)
Slot.constants = constants

module.exports = Slot