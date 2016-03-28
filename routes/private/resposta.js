var express = require('express')
var router = express.Router()
var Resposta = require('../../model/modelResposta')

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



    return res.sendStatus(400)
})

module.exports = router