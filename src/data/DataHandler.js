import * as firebase from "firebase/app";
import "firebase/database";
import { Lead, InfoPessoal, ProximaAcao, ContatoLead,
  EnumTipoConta, EnumTipoAcao, EnumOrigemLead, EnumFormaContato } from "../model/Lead";
import { StatusLeadAtivo } from "../model/StatusLead";

const pathLeads = 'Leads';

class DataHandler {
    static async getAllLeads() {
        let data = (await firebase
            .database()
            .ref(pathLeads)
            .once('value'))
            .val();
        
        if(data === null) {
            return [];
        }
        
        let ret = [];
        
        for(var id in data) {
          ret.push(this.formatLeadFromDb(id, data[id]));
        }
        
        return ret;
    }
    
    static formatLeadFromDb(dbId, dbLead) {
      // Não é bonito mas é pra amanhã
      dbLead.id = dbId;
      if(dbLead.listaContatos === undefined) {
        dbLead.listaContatos = [];
      }
      if(dbLead.valoresMatriz === undefined) {
        dbLead.valoresMatriz = [];
      }
      return dbLead;
    }
    
    static async getLeadsFromSdr(nomeSdrResponsavel) {
      let leads = await this.getAllLeads();
      return leads.filter((lead) => lead.nomeSdrResponsavel === nomeSdrResponsavel);
    }
    
    static async getLeadFromId(idLead) {
        let data = (await firebase
            .database()
            .ref(pathLeads)
            .child(idLead)
            .once('value'))
            .val();
        
        return this.formatLeadFromDb(idLead, data);
    }
    
    static async updateLead(lead) {
      return firebase
          .database()
          .ref(pathLeads)
          .child(lead.id)
          .update(lead);
    }
    
    static populateDatabase() {
      
      let leads = [
        Lead(
          [
            ContatoLead(
              EnumFormaContato.telefone,
              'Murillo Douglas',
              new Date().getTime(),
              ''
            ),
          ],
          InfoPessoal(
            EnumTipoConta.pessoaFisica,
            'José de Souza',
            '013.619.277-61',
            'josedesouza@gmail.com',
            '99133-5060',
            new Date('08-04-1982').getTime(),
            'Cascavel',
            'Brasileiro',
          ),
          EnumOrigemLead.marketing,
          new Date().getTime(),
          [],
          'Murillo Douglas',
          null,
          StatusLeadAtivo()
        )
      ];
      
      for(var lead of leads) {      
        firebase
          .database()
          .ref(pathLeads)
          .push()
          .set(lead);
      }
    }
}

export default DataHandler;
