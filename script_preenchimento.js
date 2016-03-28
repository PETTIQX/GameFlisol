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

var idQuestionario;

questionario.save(function(err, questionario){

    console.log(err)

    console.log(questionario)

    idQuestionario = questionario._id;
})

var Participante = require('./model/modelParticipante')

var participante = new Participante({
    _id : "1234",
    nome: "Jordy Garanhão",
    email: "jordy_das_novinha@gmail.com",
    autenticado: false
})

participante.save(function(err, participante){

    console.log(err)

    console.log(participante)

})

var Slot = require('./model/modelSlotQuestionario')

var slot = new Slot({
    questionarios: [idQuestionario],
    slotHorario: 1
})

slot.save(function(err, slot){

    console.log(err)

    console.log(slot)

})