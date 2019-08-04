function Lead(
	listaContatos,			// array de ContatoLead
	infoPessoal,			// obj do tipo InfoPessoal
	origemLead,				// EnumOrigemLead
	dataOrigemLead,			// obj do tipo Date
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

function InfoPessoal(
  tipo,         // EnumTipoConta        
  nomeConta,    // String
  CPF_CNPJ,     // String
  email,        // String
  telefone,     // String
  dataNascimento,   // obj do tipo Date
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
	data		// obj do tipo Date
) {
	return {
		tipoAcao,
		data
	};
}

function ContatoLead(
	formaContato,			// EnumFormaContato
	nomeSdrResponsavel,		// String
	timestamp,				// obj do tipo Date
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
  pessoaJuridica: 1
};

var EnumTipoAcao = {
	ligar: 0,
	enviarWhatsapp: 1,
	enviarEmail: 2,
	aguardarResposta: 3
};

var EnumOrigemLead = {
	marketing: 0,
	simulador: 1,
	formularioSite: 2,
	bioMeek: 3
};

var EnumFormaContato = {
	telefone: 0,
	email: 1,
	whatsapp: 2,
	pessoalmente: 3
};

export { Lead, InfoPessoal, ProximaAcao, ContatoLead,
  EnumTipoConta, EnumTipoAcao, EnumOrigemLead, EnumFormaContato };
