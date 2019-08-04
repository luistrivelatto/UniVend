import React, {Component} from 'react'
import Loading from '../widgets/Loading';
import ConfirmaVenda from '../widgets/ConfirmaVenda';
import DataHandler from '../../data/DataHandler';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';


import DadosLead from '../widgets/DadosLead'

import {
    getDuracaoDesdeUltimoContato, getDuracaoTotal, isLeadPendente,
    isLeadEmAndamento, getDescricaoProximaAcaoOuStatus
} from "../../model/Lead";
import {getHumanReadableDuration} from '../../utils/utils';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            leads: [],
            open: false,
            venda: false
        };
    }

    colors = (color) => {
        if (color == "green") {
            return "#38E896"
        } else if (color == "yellow") {
            return "#EAEB5F"
        } else {
            return "#FF2922"
        }
    }

    handleChangeVenda = () => {
        const {venda} = this.state
        this.setState({venda: !venda})
    }

    async componentDidMount() {
        let leads = await DataHandler.getAllLeads();
        this.setState({
            loading: false,
            leads
        });
        // DataHandler.populateDatabase()
    }

    handleClickPendente = (lead) => {
        const {open} = this.state
        this.setState({lead: lead, open: !open})
    }


    handleModal = () => {
        const {open} = this.state
        this.setState({
            open: !open
        })
    }

    render() {
        const {leads, lead, open, venda} = this.state
        if (this.state.loading) {
            return (
                <Loading/>
            );
        }

        return (
            <div>
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
                        {open &&
                        <Card style={{width: "50%", padding: 20}}>
                            <div style={{margin: 20, padding: 15}}>
                                <div>
                                    <Typography align={'center'} style={{fontSize: 18, fontWeight: 'bold'}}> Confirmação
                                        de
                                        Venda
                                    </Typography>

                                    <div>
                                        <Typography align={'center'} style={{fontSize: 15}}>
                                            {'Nome: ' + lead.infoPessoal.nomeConta}
                                        </Typography>
                                    </div>

                                    <div>
                                        <Typography align={'center'} style={{fontSize: 15}}>
                                            {'Telefone: ' + lead.infoPessoal.telefone}
                                            {console.log(lead)}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography align={'center'} style={{fontSize: 15}}>
                                            {'CPF/CNPJ: ' + lead.infoPessoal.CPF_CNPJ}
                                            {console.log(lead)}
                                        </Typography>
                                    </div>
                                    <Grid container>
                                        <Grid align={'end'} item xs={12} sm={6}>
                                            <Switch
                                                checked={venda}
                                                onChange={() => {
                                                    this.handleChangeVenda('venda')
                                                }}
                                                value="venda"
                                                color="primary"
                                                inputProps={{'aria-label': 'primary checkbox'}}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography align={'start'} style={{fontSize: 15, paddingTop: 15}}>
                                                Venda Foi Fechada?
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                            <div align="center">
                                <Button variant={"contained"} color={"primary"}
                                        onClick={this.handleModal}>
                                    Confirmar
                                </Button>
                            </div>

                        </Card>}
                    </div>
                </Modal>
                <Grid container>
                    <Grid item xs={12} sm={12}>
                        <Grid item xs={12} sm={7}>
                            <Paper style={{margin: 20, padding: 10}}>
                                <div>
                                    <Typography style={{fontSize: 18}}>Pendentes</Typography>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Nome</TableCell>
                                                <TableCell align="right">Nº Contatos</TableCell>
                                                <TableCell align="right">Último Contato</TableCell>
                                                <TableCell align="right">Tempo Total</TableCell>
                                                <TableCell align="right">Próxima Ação</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {leads
                                                .filter((lead) => isLeadPendente(lead))
                                                .map((lead) => (
                                                    <TableRow
                                                        key={lead.id} onClick={() => {
                                                        this.handleClickPendente(lead)
                                                    }}>
                                                        {console.log(lead.preScore)}
                                                        <TableCell>
                                                            <div style={
                                                                {
                                                                    background: lead.preScore >= 0.5 ? "#38E896" : lead.preScore <= 0.3 ? "#FF2922" : "#EAEB5F",
                                                                    borderRadius: "60%",
                                                                    color: lead.preScore >= 0.5 ? "#38E896" : lead.preScore <= 0.3 ? "#FF2922" : "#EAEB5F"
                                                                }
                                                            }>
                                                                .
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>{lead.infoPessoal.nomeConta}</TableCell>
                                                        <TableCell>{lead.listaContatos.length}</TableCell>
                                                        <TableCell>{getHumanReadableDuration(getDuracaoDesdeUltimoContato(lead))}</TableCell>
                                                        <TableCell>{getHumanReadableDuration(getDuracaoTotal(lead))}</TableCell>
                                                        <TableCell>{getDescricaoProximaAcaoOuStatus(lead)}</TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )

    }
}

export default Home;