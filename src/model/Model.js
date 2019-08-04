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
		listaContatos || [],
		infoPessoal,
		origemLead,
		dataOrigemLead,
		valoresMatriz || [],
		nomeSdrResponsavel,
		proximaAcao,
		status
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

function StatusLeadAtivo(
) {
	return {
		tipo: EnumTipoStatusLead.ativo
	};
}

function StatusLeadCongelado(
	motivo,					// EnumMotivoCongelado
	submotivo,				// String
	dataDeixouDeSerLead		// obj do tipo Date
) {
	return {
		tipo: EnumTipoStatusLead.congelado
		motivo,
		submotivo,
		dataDeixouDeSerLead
	};
}

function StatusLeadRepassadoParaVenda(
	dataDeixouDeSerLead		// obj do tipo Date
) {
	return {
		tipo: EnumTipoStatusLead.repassadoParaVenda,
		dataDeixouDeSerLead
	};
}

function StatusLeadVendaFechada (
	dataDeixouDeSerLead,		// obj do tipo Date
	dataFechouVenda				// obj do tipo Date
) {
	return {
		tipo: EnumTipoStatusLead.vendaFechada,
		dataDeixouDeSerLead,
		dataFechouVenda
	};
}

function StatusLeadCongeladoAposRepasseVenda(
	motivo,					// EnumMotivoCongelado
	submotivo,				// String
	dataDeixouDeSerLead,	// obj do tipo Date
	dataCongelouVenda		// obj do tipo Date
) {
	return {
		tipo: EnumTipoStatusLead.congeladoAposRepasseVenda,
		motivo,
		submotivo,
		dataDeixouDeSerLead,
		dataCongelouVenda
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

var EnumTipoStatusLead = {
	ativo: 0,
	congelado: 1,
	repassadoParaVenda: 2,
	vendaFechada: 3,
	congeladoAposRepasseVenda: 4
};

var EnumMotivoCongelado = {
	concorrente: 0,
	preco: 1,
	semInteresse: 2,
	naoConseguiuContato: 3
};
