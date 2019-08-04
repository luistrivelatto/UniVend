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
		tipo: EnumTipoStatusLead.congelado,
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

export { StatusLeadAtivo, StatusLeadCongelado, StatusLeadRepassadoParaVenda,
  StatusLeadVendaFechada, StatusLeadCongeladoAposRepasseVenda,
  EnumTipoStatusLead, EnumMotivoCongelado };
