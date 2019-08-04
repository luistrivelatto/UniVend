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
import Typography from '@material-ui/core/Typography';
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
            leads: []
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

    async componentDidMount() {
        let leads = await DataHandler.getAllLeads();
        this.setState({
            loading: false,
            leads
        });
        // DataHandler.populateDatabase()
    }

    handleClickPendente = (lead) => {
        this.setState({lead: lead})
    }


    render() {
        const {leads, lead} = this.state
        let showLead
        if (typeof lead !== 'undefined') {
            showLead = true
        } else {
            showLead = false

        }

        if (this.state.loading) {
            return (
                <Loading/>
            );
        }

        return (
            <div id='app'>
                <Grid container>
                    <Grid item xs={12} sm={6}>

                        <Grid item xs={12} sm={12}>
                            {showLead && <ConfirmaVenda/>}
                        </Grid>

                        <Grid item xs={12} sm={12}>
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
                                                        style={{background: lead.preScore >= 0.5 ? "#38E896" : lead.preScore <= 0.3 ? "#FF2922" : "#EAEB5F"}}
                                                        key={lead.id} onClick={() => {
                                                        this.handleClickPendente(lead)
                                                    }}>
                                                        {console.log(lead.preScore)}

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

                    <Grid item xs={12} sm={6}>
                        {showLead && <DadosLead lead={lead} editable={false}/>}
                    </Grid>
                </Grid>
            </div>
        )

    }
}

export default Home;