import React, {Component} from 'react';
import {toast} from 'react-toastify';
import Loading from '../widgets/Loading';
import DataHandler from '../../data/DataHandler';
import ListContatos from '../widgets/ListContatos';
import DadosLead from '../widgets/DadosLead';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {ProximaAcao, ContatoLead} from '../../model/Lead';
import {StatusLeadRepassadoParaVenda, StatusLeadCongelado} from '../../model/StatusLead';
import FormFisico from "../widgets/FormFisico";
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import {Typography} from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';



class Lead extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            loading: true,
            lead: {},
            open: false,
            tipo: 0
        };
    }
    
    async componentDidMount() {
        let lead = (await DataHandler.getLeadFromId(this.state.id));
        this.setState({
            loading: false,
            lead
        });
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

    handleChangeSelect = (event) => {
        console.log('value: ', event.target.value)
        console.log('name: ', event.target.name)

        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleModal = () => {
        const {open} = this.state
        this.setState({
            open: !open
        })
    }

    render() {
        const {lead, open, tipo} = this.state
        if (this.state.loading) {
            return (
                <Loading/>
            );
        }
        return (
            <div style={{padding: 10}}>
                <Grid container>

                    <Grid item xs={4} sm={12}>
                        <Grid container>
                            <Grid item xs={4} sm={6}>
                                <DadosLead lead={lead}/>
                            </Grid>

                            <Grid item xs={8} sm={6}>
                                <FormFisico/>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={4} sm={12}>
                        <Grid item xs={12} sm={12}>
                            <ListContatos contatos={lead.listaContatos}/>
                            <Button variant={"contained"} color={"primary"} onClick={this.handleModal}>Novo Contato </Button>
                        </Grid>
                    </Grid>

                    <Modal
                    disableBackdropClick={false}	
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={this.handleModal}
                    >
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "20%",
                            height: "60vh"
                        }}>
                            <Card style={{width: "80%", height: "40%"}}>
                                <InputLabel>Tipo</InputLabel>
                                    <Select
                                        value={tipo}
                                        onChange={this.handleChangeSelect}
                                        name="tipo"
                                        input={
                                            <Input/>
                                        }
                                        style={{marginTop: 18}}
                                        fullWidth
                                    >
                                        <MenuItem value={0}>Não</MenuItem>
                                        <MenuItem value={1}>Telefone</MenuItem>
                                        <MenuItem value={2}>E-Mail</MenuItem>
                                        <MenuItem value={3}>Whatsapp</MenuItem>
                                        <MenuItem value={4}>Pessoalmente</MenuItem>
                                    </Select>
                            </Card>
                        </div>    
                    </Modal>
                </Grid>
            </div>
        )
    }
}

export default Lead;
