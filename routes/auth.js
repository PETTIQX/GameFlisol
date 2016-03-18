var jwt = require('jwt-simple')
var config = require('../config')

module.exports = function(req,res,next){

    console.log("Authentication ...")

    if(req.headers[config.authHeader]){
        try{
            req.auth = jwt.decode(req.headers[config.authHeader], config.secretKeyToken)
        }catch(err){
            console.log(err)
            req.unauthorized = true
        }
    }else{
        req.unauthorized = true
    }

    if(req.unauthorized){
        return res.json(401)
    }

    next()
}