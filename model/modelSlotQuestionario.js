var mongoose = require('../db.js')
var Schema = mongoose.Schema
ObjectId = Schema.ObjectId

var constants = {
    MODEL_NAME: 'Slot',
    COLLECTION_NAME: 'slots'
}

var schema = Schema({
    questionarios: [{idQuestionario : ObjectId, nome: String}],
    slotHorario: Number
}, {collection: constants.COLLECTION_NAME})

schema.statics.buscaPorHorario = function(slotHorario, cb){

    var query = {slotHorario: slotHorario}

    this.find(query).exec(cb)

}

var Slot = mongoose.model(constants.MODEL_NAME, schema)
Slot.constants = constants

module.exports = Slot