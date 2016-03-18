var Questionario = require('./model/modelQuestionario')

var questionario = new Questionario({

    questoes: [
        {
            enunciado: "Questão 1",
            opcoes: [{idOpcao:1, descricao: "Opção 1"}, {idOpcao:2, descricao: "Opção 2"}],
            respostaCorreta: {idOpcao: 1, descricao: "Opção 1"},
            pontuacao: 10
        }
    ],
    sala : "Oficina 1",
    senha: "senhaoficina1"

})

questionario.save(function(err, questionario){

    console.log(err)

    console.log(questionario)


})