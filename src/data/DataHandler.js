import * as firebase from "firebase/app";
import "firebase/database";

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
        
        return Object.keys(data).map((id) => data[id]);
    }

    static async getAllLeads() {
      return await this.getAllItems(pathLeads);
    }
}

export default DataHandler;
