function StatusLeadAtivo(
) {
	return {
		tipo: EnumTipoStatusLead.ativo
	};
}

function StatusLeadCongelado(
	motivo,					// EnumMotivoCongelado
	submotivo,				// String
	dataDeixouDeSerLead		// timestamp
) {
	return {
		tipo: EnumTipoStatusLead.congelado,
		motivo,
		submotivo,
		dataDeixouDeSerLead
	};
}

function StatusLeadRepassadoParaVenda(
	dataDeixouDeSerLead		// timestamp
) {
	return {
		tipo: EnumTipoStatusLead.repassadoParaVenda,
		dataDeixouDeSerLead
	};
}

function StatusLeadVendaFechada (
	dataDeixouDeSerLead,		// timestamp
	dataFechouVenda				// timestamp
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
	dataDeixouDeSerLead,	// timestamp
	dataCongelouVenda		// timestamp
) {
	return {
		tipo: EnumTipoStatusLead.congeladoAposRepasseVenda,
		motivo,
		submotivo,
		dataDeixouDeSerLead,
		dataCongelouVenda
	};
}

var EnumTipoStatusLead = {
	ativo: 0,
	congelado: 1,
	repassadoParaVenda: 2,
	vendaFechada: 3,
	congeladoAposRepasseVenda: 4,
  toString: [
    'Ativo',
    'Congelado',
    'Repassado para venda',
    'Venda finalizada',
    'Congelado apos repasse para venda'
  ]
};

var EnumMotivoCongelado = {
	concorrente: 0,
	preco: 1,
	semInteresse: 2,
	naoConseguiuContato: 3,
  outro: 4,
  toString: [
    'Concorrente',
    'Preço',
    'Sem interesse',
    'Não conseguiu contato',
    'Outro'
  ]
};

export { StatusLeadAtivo, StatusLeadCongelado, StatusLeadRepassadoParaVenda,
  StatusLeadVendaFechada, StatusLeadCongeladoAposRepasseVenda,
  EnumTipoStatusLead, EnumMotivoCongelado };
