var express = require('express')
var router = express.Router()
var Slot = require('../../model/modelSlotQuestionario')

//TODO configurar as rotas

/*router.get('/', function(req,res,next){

 res.json("autorizado")

 })*/

router.get('/',function(req,res,next){


    if(req.query.idSlot){

        Slot.findById(req.query.idSlot, function(err, slot){

            if(err) return next(err)

            if(!slot) return res.sendStatus(204) //no content

            return res.json(slot)
        })

    }else{

        return res.sendStatus(400)
    }


})

router.get('/buscaPorHorario', function(req,res,next){

    if(!req.query.slotHorario) return res.sendStatus(400);

    Slot.buscaPorHorario(req.query.slotHorario, function(err, slots){

        if(err) return next(err)

        return res.json(slots)

    })

})


router.post('/query', function(req,res,next){

    //todo verificar se req.body está vazio

    if(!req.body){
        return res.sendStatus(400)
    }

    Slot.find(req.body).exec(function(err, slots){

        if(err) return next(err)

        return res.json(slots)

    })

})


module.exports = router