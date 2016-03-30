var mongoose = require('../db.js')
var Schema = mongoose.Schema
ObjectId = Schema.ObjectId

var constants = {
    MODEL_NAME: 'Resposta',
    COLLECTION_NAME: 'respostas'
}

var schema = Schema({
    participante: {type:String, required:true}, //número inscrição
    respostaQuestionario: {
        questionario: {type:ObjectId, required:true},
        respostas: [
            {
                idQuestao: ObjectId,
                resposta: Number, //idOpção
                correta: Boolean,
                tempo: Number
            }
        ]
    }
}, {collection: constants.COLLECTION_NAME})

schema.statics.buscarRespostaPorUsuario = function(idParticipante, cb){

    var query = {participante: idParticipante}

    this.find(query).exec(cb)
}


schema.statics.rankingGeral = function(cb){

    console.log("Update mapreduce: " + global.updateMapReduce);

    if(global.updateMapReduce || !global.mapReduce) {
        var o = {}
        o.map = function () {
            for (var idx = 0; idx < this.respostaQuestionario.respostas.length; idx++) {
                var resposta = this.respostaQuestionario.respostas[idx]
                if (resposta.correta) {
                    var key = this.participante
                    var value = {pontuacao: 1, tempo: resposta.tempo}
                    emit(key, value)
                }
            }
        }
        o.reduce = function (key, values) {
            var tempo = 0
            var pontuacao = 0
            for (var i = 0; i < values.length(); i++) {
                pontuacao += values[i].pontuacao
                tempo += values[i].tempo
            }
            return {pontuacao: pontuacao, tempo: tempo}
        }
        o.out = {replace: 'rankingGeral'}
        o.verbose = true

        this.mapReduce(o, function (err, model, stats) {

            if (err) return cb(err)

            console.log(stats)

            //console.log(model)

            global.mapReduce = model
            global.updateMapReduce = false

            model.find().sort({"value.pontuacao": -1, "value.tempo": 1}).exec(cb)

        })
    }else{

        console.log("Using cache")

        global.mapReduce.find().sort({"value.pontuacao": -1, "value.tempo": 1}).exec(cb)

    }


}

schema.statics.pontuacaoParticipante = function(idParticipante, cb){
    //todo usar query no mapreduce

    var o = {}
    o.map = function(){
        for(var idx = 0; idx < this.respostaQuestionario.respostas.length; idx++){
            var resposta = this.respostaQuestionario.respostas[idx]
            if(resposta.correta){
                var key = this.participante
                var value = 1
                emit(key, value)
            }
        }
    }
    o.reduce = function(key,values){
        return Array.sum(values)
    }
    o.out = { replace: 'rankingGeral' }
    o.verbose = true

    this.mapReduce(o, function(err, model, stats){

        if(err) return cb(err)

        console.log(stats)

        model.findOne({"_id":idParticipante}).sort({"value":-1}).exec(cb)

    })

}

var Slot = mongoose.model(constants.MODEL_NAME, schema)
Slot.constants = constants

module.exports = Slot