import React, {Component} from 'react';
import { toast } from 'react-toastify';
import Loading from '../widgets/Loading';
import DataHandler from '../../data/DataHandler';
import ListContatos from '../widgets/ListContatos';
import DadosLead from '../widgets/DadosLead';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ProximaAcao, ContatoLead } from '../../model/Lead';
import { StatusLeadRepassadoParaVenda, StatusLeadCongelado } from '../../model/StatusLead';

class Lead extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            loading: true,
            lead: {}
        };
    }

    async componentDidMount() {
        let lead = (await DataHandler.getLeadFromId(this.state.id));
        this.setState({
            loading: false,
            lead
        });
        
        this.cadastrarContatoFinalizarLead(
          2,
          'Obsssss',
          3,
          'Submotivo'
        );
    }
    
    cadastrarNovoContato(formaContato, observacoes) {
      const nomeSdrResponsavel = 'Murillo Douglas';   // hard-codado para fins de protótipo
      
      this.state.lead.listaContatos.push(ContatoLead(
        formaContato,
        nomeSdrResponsavel,
        new Date().getTime(),
        observacoes
      ));
    }
    
    async cadastrarContatoAgendarRecontato(formaContato, observacoes, tipoRecontato, dataRecontato) {
      this.cadastrarNovoContato(formaContato, observacoes);
      let lead = this.state.lead;
      lead.proximaAcao = ProximaAcao(
        tipoRecontato,
        dataRecontato
      );
      await DataHandler.updateLead(lead);
      toast.success('Novo contato cadastrado com sucesso');
    }
    
    async cadastrarContatoRepassarParaVenda(formaContato, observacoes) {
      this.cadastrarNovoContato(formaContato, observacoes);
      let lead = this.state.lead;
      lead.proximaAcao = null;
      lead.status = StatusLeadRepassadoParaVenda(new Date().getTime());
      await DataHandler.updateLead(lead);
      toast.success('Novo contato cadastrado com sucesso');
    }
    
    async cadastrarContatoFinalizarLead(formaContato, observacoes, motivo, submotivo) {
      this.cadastrarNovoContato(formaContato, observacoes);
      let lead = this.state.lead;
      lead.proximaAcao = null;
      lead.status = StatusLeadCongelado(motivo, submotivo, new Date().getTime());
      await DataHandler.updateLead(lead);
      toast.success('Novo contato cadastrado com sucesso');
    }
    
    handleChangeInput = event => {
        console.log('name: ', [event.currentTarget.name], 'value', event.currentTarget.value)
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        });
    }

    render() {
        const {lead} = this.state
        if (this.state.loading) {
            return (
                <Loading/>
            );
        }
        return (
            <div style={{padding: 10}}>
                <Grid container>
                    <Grid item xs={4} sm={6}>
                        <DadosLead lead={lead}/>
                    </Grid>

                    <Grid item xs={4} sm={6}>
                        <ListContatos contatos={lead.listaContatos}/>
                    </Grid>


                    <Grid item xs={8} sm={12}>
                        <Paper style={{margin: 5, padding: 15}}>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Lead;
