var express = require('express')
var router = express.Router()

//TODO configurar as rotas

router.get('/', function(req,res,next){

    res.json("autorizado")

})

module.exports = router
