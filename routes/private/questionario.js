var express = require('express')
var router = express.Router()
var Questionario = require('../../model/modelQuestionario')

router.get('/', function(req,res,next){

    if(req.query.idQuestionario){

        Questionario.findById(req.query.idQuestionario, function(err, questionario){

            if(err) return next(err)

            if(!questionario) return res.sendStatus(204) //no content

            return res.json(questionario)
        })

    }else{

        return res.sendStatus(400)
    }

})


router.post('/query', function(req,res,next){

    //TODO verificar se req.body está vazio

    if(!req.body){
        return res.sendStatus(400)
    }

    Questionario.find(req.body).exec(function(err, questionarios){

        if(err) return next(err)

        return res.json(questionarios)

    })

})


module.exports = router