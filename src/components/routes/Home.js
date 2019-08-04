import React, {Component} from 'react'
import Loading from '../widgets/Loading';
import DataHandler from '../../data/DataHandler';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import {
    getDuracaoDesdeUltimoContato, getDuracaoTotal, isLeadPendente,
    isLeadEmAndamento, getDescricaoProximaAcaoOuStatus
} from "../../model/Lead";
import {getHumanReadableDuration} from '../../utils/utils';
import ChartsPage from '../widgets/ChartsPage';
import {Pie} from 'react-chartjs-2';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            leads: [],
            teste: {}
        };
    }

    async componentDidMount() {
        let leads = await DataHandler.getAllLeads();
        this.setState({
            loading: false,
            leads
        });
        // DataHandler.populateDatabase()
    }

    handleClickPendente = (id) => {
        this.props.history.push('lead/' + id)
    }

    handleClickAtendimento = (id) => {
        this.props.history.push('lead/' + id)
    }


    render() {
        const {leads} = this.state
        if (this.state.loading) {
            return (
                <Loading/>
            );
        }

        return (
            <main id='app'>
                <Paper style={{margin: 20, padding: 10}}>
                    <Grid container>
                        <Grid item xs={6} sm={7}>
                            <div>
                                <Typography color="primary"
                                            style={{fontSize: 18, paddingLeft: 20}}>Pendentes</Typography>
                                <Paper style={{margin: 20, padding: 10, boxShadow: "10 10 10 black"}}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center"></TableCell>
                                                <TableCell align="right">Nome</TableCell>
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

                                                    <TableRow key={lead.id} onClick={() => {
                                                        this.handleClickPendente(lead.id)
                                                    }}>
                                                        {/* <TableCell style={{background: lead.preScore >= 0.5 ? "#38E896" : lead.preScore <= 0.3 ? "#FF2922" : "#EAEB5F"}} >{lead.infoPessoal.nomeConta}</TableCell> */}
                                                        <TableCell>
                                                            <div style={
                                                                {
                                                                    background: lead.preScore >= 0.5 ? "#38E896" : lead.preScore <= 0.3 ? "#FF2922" : "#EAEB5F",
                                                                    borderRadius: "50%",
                                                                    color: lead.preScore >= 0.5 ? "#38E896" : lead.preScore <= 0.3 ? "#FF2922" : "#EAEB5F"
                                                                }
                                                            }>
                                                                .....
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
                                </Paper>
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={5}>
                            <Typography color='primary' style={{fontSize: 18, paddingLeft: 20}}>Resumo dos
                                Leads</Typography>
                            <Paper style={{margin: 20, padding: 10, boxShadow: "10 10 10 black"}}>
                                <ChartsPage>
                                </ChartsPage>
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper style={{margin: 20, padding: 10}}>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <div>
                                <Typography style={{fontSize: 18}}>Em Atendimento</Typography>
                                <Paper style={{margin: 20, padding: 10}}>

                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center"></TableCell>
                                                <TableCell align="right">Nº Contatos</TableCell>
                                                <TableCell align="right">Último Contato</TableCell>
                                                <TableCell align="right">Tempo Total</TableCell>
                                                <TableCell align="right">Próxima Ação</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {leads
                                                .filter((lead) => isLeadEmAndamento(lead))
                                                .map((lead) => (
                                                    <TableRow key={lead.id} onClick={() => {

                                                        this.handleClickAtendimento(lead.id)
                                                    }}>
                                                        <TableCell>
                                                            <div style={
                                                                {
                                                                    background: lead.preScore >= 0.5 ? "#38E896" : lead.preScore <= 0.3 ? "#FF2922" : "#EAEB5F",
                                                                    borderRadius: "50%",
                                                                    color: lead.preScore >= 0.5 ? "#38E896" : lead.preScore <= 0.3 ? "#FF2922" : "#EAEB5F"
                                                                }
                                                            }>
                                                                .....
                                                            </div>
                                                        </TableCell> <TableCell>{lead.listaContatos.length}</TableCell>
                                                        <TableCell>{getHumanReadableDuration(getDuracaoDesdeUltimoContato(lead))}</TableCell>
                                                        <TableCell>{getHumanReadableDuration(getDuracaoTotal(lead))}</TableCell>
                                                        <TableCell>{getDescricaoProximaAcaoOuStatus(lead)}</TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </main>
        )
    }
}

export default Home;