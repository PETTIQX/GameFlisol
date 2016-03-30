var express = require('express')
var router = express.Router()
var config = require('../../config')
var Participante = require('../../model/modelParticipante')
var Resposta = require('../../model/modelResposta')
var jwt = require('jwt-simple')

//TODO configurar as rotas
//router.use('/private', require('./private'))

router.post('/authenticate', function(req,res,next){

    if(!req.body.numeroInscricao) return res.sendStatus(400)

    Participante.authenticateUser(req.body.numeroInscricao, function(err, code, participante){

        if(err) return next(err)

        if(code === 401) return res.sendStatus(401)

        if(participante){

            var payload = {nome : participante.nome,
                            _id: participante._id,
                            email: participante.email}

            var token = jwt.encode(payload, config.secretKeyToken)

            return res.json({token:token})

        }else{
            return res.sendStatus(401)
        }

    })

})

router.get('/rankingGeral', function(req,res,next){

    Resposta.rankingGeral(function(err, ranking){

        if(err) return next(err)

        return res.json(ranking)

    })
})

router.get('/updateRanking', function(req,res,next){

    global.updateMapReduce = true

    return res.sendStatus(200)
})

module.exports = router
