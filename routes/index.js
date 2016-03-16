var express = require('express')
var router = express.Router()

//TODO configurar as rotas
//router.use('/private', require('./private'))

router.get('/', function(req,res,next){

    res.send("ok")

})

module.exports = router
