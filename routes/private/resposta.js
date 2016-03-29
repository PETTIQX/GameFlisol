var express = require('express')
var router = express.Router()
var Resposta = require('../../model/modelResposta')
var Questionario = require('../../model/modelQuestionario')
var Participante = require('../../model/modelParticipante')
var _ = require('lodash')

//TODO configurar as rotas

/*router.get('/', function(req,res,next){

 res.json("autorizado")

 })*/

router.get('/', function(req,res,next){


    Resposta.buscarRespostaPorUsuario(req.auth._id, function(err, respostas){

        if(err) return next(err)

        return res.json(respostas)

    })

})

router.get('/rankingGeral', function(req,res,next){

    Resposta.rankingGeral(function(err, ranking){

        if(err) return next(err)

        return res.json(ranking)

    })

})

router.get('/pontuacaoParticipante', function(req,res,next){

    var idParticipante = req.auth._id

    Resposta.pontuacaoParticipante(idParticipante, function(err, ranking){

        if(err) return next(err)

        return res.json(ranking)

    })

})

router.post('/adicionarResposta', function(req,res,next){

    console.log(req.body)

    if(!req.body.resposta) {
        return res.sendStatus(400)
    }

    var resposta = new Resposta(req.body.resposta)

    var idParticipante = req.auth._id

    Participante.findById(idParticipante).exec(function(err, participante){

        if(err) return next(err)

        Questionario.findById(resposta.respostaQuestionario.questionario).exec(function(err, questionario){

            if(err) return next(err)

            var intersection = _.intersection(participante.slotsRespondidos, questionario.slotHorario)

            console.log(intersection)

            if(_.isEmpty(intersection)){

                resposta.save(function(err, resposta){

                    if(err) return next(err)

                    console.log(participante.slotsRespondidos)
                    console.log(questionario.slotHorario)

                    for(var i = 0; i < questionario.slotHorario.length; i++){
                        participante.slotsRespondidos.push(questionario.slotHorario[i])
                    }

                    participante.save(function(err, participante){

                        console.log(participante)

                        return res.sendStatus(200)
                    })
                    //Participante.update({_id:participante._id}, {slotsRespondidos:participante.slotsRespondidos})

                })

            }else{
                return res.send("Slot já respondido");
            }
        })

    })

})

module.exports = router