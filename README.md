# GameFlisol

db.getCollection('respostas').mapReduce(
function(){
        emit(this.participante, this.pontuacao)
},
function(key, values){
        return Array.sum(values)
},{out: "qtd_respostas"})

db.qtd_respostas.find().sort({value:1})

http://mongoosejs.com/docs/api.html#model_Model.mapReduce

db.getCollection('respostas').mapReduce(
function(){
        for(var idx = 0; idx < this.respostaQuestionario.respostas.length; idx++){
            var resposta = this.respostaQuestionario.respostas[idx]
            if(resposta.correta){
                var key = this.participante
                var value = 1
                emit(key, value)
            }
        }
},
function(key, values){
        return Array.sum(values)
},{query:{'respostaQuestionario.questionario' : ObjectId("56ec63b4b0851dcc4d0d6957")},out: "qtd_respostas"})

db.qtd_respostas.find()