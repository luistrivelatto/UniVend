import { StatusLeadAtivo, StatusLeadCongelado, StatusLeadRepassadoParaVenda,
  StatusLeadVendaFechada, StatusLeadCongeladoAposRepasseVenda,
  EnumTipoStatusLead, EnumMotivoCongelado } from './StatusLead';
import { getHumanReadableDuration } from '../utils/utils';

function Lead(
	listaContatos,			// array de ContatoLead
	infoPessoal,			// obj do tipo InfoPessoal
	origemLead,				// EnumOrigemLead
	dataOrigemLead,			// timestamp
	valoresMatriz,			// array de [dynamic] com os valores da matriz
	nomeSdrResponsavel,		// String
	proximaAcao,			// obj do tipo ProximaAcao (pode ser null)
	status					// obj do tipo StatusLead[XXX] (minha vontade depois dessa gambiarra é de cortar os dedos)
) {
	return {
		listaContatos: listaContatos || [],
		infoPessoal,
		origemLead,
		dataOrigemLead,
		valoresMatriz: valoresMatriz || [],
		nomeSdrResponsavel,
		proximaAcao,
		status
	};
}

/// Retorna null se nunca foi feito contato ou o tempo em ms
function getDuracaoDesdeUltimoContato(lead) {
  if(lead.listaContatos.length == 0) {
    return null;
  }
  return new Date() - lead.listaContatos.slice(-1)[0].timestamp;
}

/// Retorna o tempo em ms
function getDuracaoTotal(lead) {
  return new Date() - lead.dataOrigemLead;
}

function isLeadPendente(lead) {
  return lead.status.tipo == EnumTipoStatusLead.ativo &&
         (lead.proximaAcao == null ||
          lead.proximaAcao.timestamp < new Date().getTime());
}

function isLeadEmAndamento(lead) {
  return lead.status.tipo == EnumTipoStatusLead.ativo &&
         (lead.proximaAcao != null &&
          lead.proximaAcao.timestamp >= new Date().getTime());
}

function getDescricaoProximaAcaoOuStatus(lead) {
  if(lead.proximaAcao == null) {
    return '-';
  }
  
  if(isLeadPendente(lead)) {
    return EnumTipoAcao.toString[lead.proximaAcao.tipoAcao];
  }
  return EnumTipoAcao.toString[lead.proximaAcao.tipoAcao] + ' em '
      + getHumanReadableDuration(lead.proximaAcao.timestamp - new Date());
}

function InfoPessoal(
  tipo,         // EnumTipoConta        
  nomeConta,    // String
  CPF_CNPJ,     // String
  email,        // String
  telefone,     // String
  dataNascimento,   // timestamp
  cidade,       // String
  nacionalidade // String
) {
  return {
      tipo,
      nomeConta,
      CPF_CNPJ,
      email,
      telefone,
      dataNascimento,
      cidade,
      nacionalidade
  };
}

function ProximaAcao(
	tipoAcao,	// EnumTipoAcao
	timestamp		// timestamp
) {
	return {
		tipoAcao,
		timestamp
	};
}

function ContatoLead(
	formaContato,			// EnumFormaContato
	nomeSdrResponsavel,		// String
	timestamp,				// timestamp
	observacoes				// String
) {
	return {
		formaContato,
		nomeSdrResponsavel,
		timestamp,
		observacoes
	};
}

var EnumTipoConta = {
  pessoaFisica: 0,
  pessoaJuridica: 1,
  toString: [
    'Pessoa Física',
    'Pessoa Jurídica'
  ]
};

var EnumTipoAcao = {
	ligar: 0,
	enviarWhatsapp: 1,
	enviarEmail: 2,
	aguardarResposta: 3,
  toString: [
    'Ligar',
    'Enviar WhatsApp',
    'Enviar Email',
    'Aguardar Resposta'
  ]
};

var EnumOrigemLead = {
	marketing: 0,
	simulador: 1,
	formularioSite: 2,
	bioMeek: 3,
  toString: [
    'Marketing',
    'Simulador',
    'Formulário do site',
    'BioMeek'
  ]
};

var EnumFormaContato = {
	telefone: 0,
	email: 1,
	whatsapp: 2,
	pessoalmente: 3,
  toString: [
    'Telefone',
    'Email',
    'WhatsApp',
    'Pessoalmente'
  ]
};

export { Lead, InfoPessoal, ProximaAcao, ContatoLead,
  EnumTipoConta, EnumTipoAcao, EnumOrigemLead, EnumFormaContato,
  getDuracaoDesdeUltimoContato, getDuracaoTotal, isLeadPendente,
  isLeadEmAndamento, getDescricaoProximaAcaoOuStatus };
