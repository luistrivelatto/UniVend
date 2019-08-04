import {EnumTipoConta} from "./Lead";

function calculateLeadScorePessoaFisica(respostaViagem, respostaProfissao, idade) {
    let score =
            0.10 * scoreViagem(respostaViagem) +
            0.25 * scoreProfissao(respostaProfissao) +
            0.35 * scoreSinistralidade(idade) +
            0.3 * scorePermanencia(idade);

    if(scoreProfissao(respostaProfissao) < 0.2) {
        score = Math.min(score, 0.3);
    }

    return score;
}

function scoreViagem(respostaViagem) {
    return EnumRespostaViagem.scoreValue[respostaViagem || 0];
}

var EnumRespostaViagem = {
    naoInformado: 0,
    nao: 1,
    estadual: 2,
    nacional: 3,
    internacional: 4,
    toString: [
        'Nâo informado',
        'Não',
        'Sim, no estado',
        'Sim, no país',
        'Sim, para o exterior'
    ],
    scoreValue: [
        0.5,
        0,
        1/3,
        2/3,
        1
    ]
};

function scoreProfissao(respostaProfissao) {
    return Math.min(1, EnumRespostaProfissao.rendaEstimada[respostaProfissao || 0] / 9998);
}

var EnumRespostaProfissao = {
    naoInformado: 0,
    engenheiro: 1,
    advogado: 2,
    medico: 3,
    vendedor: 4,
    outro: 5,
    toString: [
        'Não informado',
        'Engenheiro',
        'Advogado',
        'Médico',
        'Vendedor',
        'Outro',
    ],
    rendaEstimada: [
        1300,
        10758,
        4668,
        7253,
        1338,
        1300
    ]
}

function scoreSinistralidade(idade) {
    if(idade == null) {
        return 0.5;
    }

    if(idade < 33) return 1;
    if(idade < 38) return 0.9;
    if(idade < 43) return 0.8;
    if(idade < 48) return 0.6;
    if(idade < 53) return 0.3;
    return 0;
}

function scorePermanencia(idade) {
    if(idade == null) {
        return 0.5;
    }

    if(idade < 18) return 0.125;
    if(idade < 23) return 0.375;
    if(idade < 28) return 0;
    if(idade < 38) return 0.25;
    if(idade < 43) return 0.375;
    if(idade < 48) return 0.5;
    if(idade < 53) return 0.625;
    if(idade < 58) return 0.75;
    return 1;
}

export default calculateLeadScorePessoaFisica;