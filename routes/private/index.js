var express = require('express')
var router = express.Router()

//TODO configurar as rotas

/*router.get('/', function(req,res,next){

    res.json("autorizado")

})*/

router.use('/questionario', require('./questionario'))
router.use('/resposta', require('./resposta'))
router.use('/slot', require('./slot'))

module.exports = router