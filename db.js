//using  Immediately Invoked Function Expression (IIFE)

(function(){
    var mongoose = require('mongoose')
    //mongoose.set('debug', true);

    //exportar conexão para uma constante
    mongoose.connect('mongodb://localhost/gameflisol', function () {
        console.log('mongodb connected')
    })
    module.exports = mongoose
})()
