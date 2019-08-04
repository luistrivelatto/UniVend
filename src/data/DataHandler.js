import * as firebase from "firebase/app";
import "firebase/database";
import { Lead, InfoPessoal, ProximaAcao, ContatoLead,
  EnumTipoConta, EnumTipoAcao, EnumOrigemLead, EnumFormaContato } from "../model/Lead";
import { StatusLeadAtivo } from "../model/StatusLead";

const pathLeads = 'Leads';

class DataHandler {
    static async getAllItems(path) {
        let data = (await firebase
            .database()
            .ref(path)
            .once('value'))
            .val();
        
        if(data === null) {
            return [];
        }
        
        for(var id in data) {
          data[id].id = id;
        }
        
        return Object.keys(data).map((id) => data[id]);
    }

    static async getAllLeads() {
      return await this.getAllItems(pathLeads);
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
