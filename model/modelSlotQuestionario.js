var mongoose = require('../db.js')
var Schema = mongoose.Schema
ObjectId = Schema.ObjectId

var constants = {
    MODEL_NAME: 'Slot',
    COLLECTION_NAME: 'slots'
}

var schema = Schema({
    questionarios: [ObjectId],
    slotHorario: Number
}, {collection: constants.COLLECTION_NAME})

var Slot = mongoose.model(constants.MODEL_NAME, schema)
Slot.constants = constants

module.exports = Slot