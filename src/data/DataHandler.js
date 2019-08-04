import * as firebase from "firebase/app";
import "firebase/database";
import {
    Lead, InfoPessoal, ProximaAcao, ContatoLead,
    EnumTipoConta, EnumTipoAcao, EnumOrigemLead, EnumFormaContato
} from "../model/Lead";
import {StatusLeadAtivo} from "../model/StatusLead";

const pathLeads = 'Leads';

class DataHandler {
    static async getAllLeads() {
        let data = (await firebase
            .database()
            .ref(pathLeads)
            .once('value'))
            .val();

        if (data === null) {
            return [];
        }

        let ret = [];

        for (var id in data) {
            // Não é bonito mas é pra amanhã
            data[id].id = id;
            if (data[id].listaContatos == null) {
                data[id].listaContatos = [];
            }
            if (data[id].valoresMatriz == null) {
                data[id].valoresMatriz = [];
            }
            ret.push(data[id]);
        }

        return ret;
    }

    static async getLeadsFromSdr(nomeSdrResponsavel) {
        let leads = await this.getAllLeads();
        return leads.filter((lead) => lead.nomeSdrResponsavel === nomeSdrResponsavel);
    }

    static populateDatabase() {

        let leads = [
            Lead(
                [],
                InfoPessoal(
                    EnumTipoConta.pessoaFisica,
                    'José de Souza',
                    '013.619.277-61',
                    'josedesouza@gmail.com',
                    '99133-5060',
                    new Date('08-04-1982'),
                    'Cascavel',
                    'Brasileiro',
                ),
                EnumOrigemLead.marketing,
                new Date(),
                [],
                'Murillo Douglas',
                null,
                StatusLeadAtivo()
            )
        ];

        for (var lead of leads) {
            firebase
                .database()
                .ref(pathLeads)
                .push()
                .set(lead);
        }
    }
}

export default DataHandler;
