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
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import {getFormattedDate} from '../../utils/utils'


class Lead extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            loading: true,
            lead: {},
            open: false,
            formaContato: 0,
            observacoes: "",
            proximaAcao: 0,
            tipoRecontato: 0,
            dataRecontato: new Date(),
            motivo: -1,
            subMotivo: ""
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

    resetStates = () => {
        this.setState({
            open: false,
            formaContato: 0,
            observacoes: "",
            proximaAcao: 0,
            tipoRecontato: 0,
            dataRecontato: new Date(),
            motivo: -1,
            subMotivo: ""
        })
    }

    onSubmit = () => {
        const {formaContato, observacoes, proximaAcao, tipoRecontato, dataRecontato, motivo, subMotivo} = this.state

        if (proximaAcao == 1) {
            this.cadastrarContatoAgendarRecontato(formaContato, observacoes, tipoRecontato, dataRecontato)
        } else if (proximaAcao == 3) {
            this.cadastrarContatoFinalizarLead(formaContato, observacoes, motivo, subMotivo)
        } else if (proximaAcao == 2) {
            this.cadastrarContatoRepassarParaVenda(formaContato, observacoes)
        } else {
            alert('Você precisa tomar um ação')
        }
        this.resetStates()
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
            [event.target.name]: event.target.value
        })
    }

    handleModal = () => {
        const {open} = this.state
        this.setState({
            open: !open
        })
    }

    render() {
        const {lead, open, formaContato, observacoes, proximaAcao, tipoRecontato, dataRecontato, motivo, subMotivo} = this.state
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
                            <Button variant={"contained"} color={"primary"} onClick={this.handleModal}>Novo
                                Contato </Button>
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
                            marginTop: "5%",

                        }}>
                            <Card style={{width: "80%", padding: 20}}>
                                <Grid container>
                                    <Grid item xs={12} sm={12}>
                                        <Typography style={{
                                            fontSize: 18,
                                            fontWeight: "bold",
                                            marginBottom: 20
                                        }}>
                                            Cadastrar novo contato
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={12}>
                                        <InputLabel>Forma de Contato</InputLabel>
                                        <Select
                                            value={formaContato}
                                            onChange={this.handleChangeSelect}
                                            name="formaContato"
                                            input={
                                                <Input/>
                                            }
                                            style={{marginTop: 18}}
                                            fullWidth
                                        >
                                            <MenuItem value={0}>Telefone</MenuItem>
                                            <MenuItem value={1}>E-Mail</MenuItem>
                                            <MenuItem value={2}>Whatsapp</MenuItem>
                                            <MenuItem value={3}>Pessoalmente</MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            onChange={this.handleChangeInput}
                                            name={'observacoes'}
                                            label="Observações"
                                            value={observacoes}
                                            style={{paddingLeft: 8}}
                                            margin="normal"
                                            fullWidth
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12}>
                                        <InputLabel>Próxima Ação</InputLabel>
                                        <Select
                                            value={proximaAcao}
                                            onChange={this.handleChangeSelect}
                                            name="proximaAcao"
                                            input={
                                                <Input/>
                                            }
                                            style={{marginTop: 18}}
                                            fullWidth
                                        >
                                            <MenuItem value={0}>Nenhuma ação</MenuItem>
                                            <MenuItem value={1}>Agendar Recontato</MenuItem>
                                            <MenuItem value={2}>Repassar para Venda</MenuItem>
                                            <MenuItem value={3}>Finalizar Lead</MenuItem>

                                        </Select>
                                        {
                                            proximaAcao == 1 ?
                                                <Grid item xs={12} sm={12}>
                                                    <Grid item xs={12} sm={12}>
                                                        <InputLabel>Forma de Recontato</InputLabel>
                                                        <Select
                                                            value={tipoRecontato}
                                                            onChange={this.handleChangeSelect}
                                                            name="tipoRecontato"
                                                            input={
                                                                <Input/>
                                                            }
                                                            style={{marginTop: 18}}
                                                            fullWidth
                                                        >
                                                            <MenuItem value={0}>Telefone</MenuItem>
                                                            <MenuItem value={1}>Whatsapp</MenuItem>
                                                            <MenuItem value={2}>E-mail</MenuItem>
                                                            <MenuItem value={3}>Aguardar Resposta</MenuItem>
                                                        </Select>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12}>
                                                        <TextField
                                                            onChange={this.handleChangeSelect}
                                                            name={'dataRecontato'}
                                                            label="Data de Recontato"
                                                            value={getFormattedDate(dataRecontato)}
                                                            type="date"
                                                            style={{paddingLeft: 8}}
                                                            margin="normal"
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                </Grid>

                                                : null}
                                        {
                                            proximaAcao == 3 ?
                                                <Grid item xs={12} sm={12}>
                                                    <Grid item xs={12} sm={12}>
                                                        <InputLabel>Motivo da Finalização do Lead</InputLabel>
                                                        <Select
                                                            value={motivo}
                                                            onChange={this.handleChangeSelect}
                                                            name="motivo"
                                                            input={
                                                                <Input/>
                                                            }
                                                            style={{marginTop: 18}}
                                                            fullWidth
                                                        >

                                                            <MenuItem value={0}>Fechou com concorrente</MenuItem>
                                                            <MenuItem value={1}>Preço</MenuItem>
                                                            <MenuItem value={2}>Não tem interesse</MenuItem>
                                                            <MenuItem value={3}>Não Conseguiu Contato</MenuItem>
                                                            <MenuItem value={4}>Outro</MenuItem>
                                                        </Select>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12}>
                                                        <TextField
                                                            onChange={this.handleChangeInput}
                                                            name={'subMotivo'}
                                                            label="Descrição do Motivo"
                                                            style={{paddingLeft: 8}}
                                                            margin="normal"
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                </Grid>
                                                : null}

                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <div style={{marginTop: 10}}/>
                                    </Grid>
                                    <Grid item xs={12} sm={8}/>
                                    <Grid item xs={12} sm={2}>
                                        <Button variant={"contained"} color={"secondary"}
                                                onClick={this.resetStates}> Cancelar</Button>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Button variant={"contained"} color={"primary"}
                                                onClick={this.onSubmit}> Ok</Button>
                                    </Grid>
                                </Grid>
                            </Card>
                        </div>
                    </Modal>
                </Grid>
            </div>
        )
    }
}

export default Lead;
