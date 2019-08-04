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


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            leads: [{}, {}]
        };
    }

    async componentDidMount() {
        let leads = await DataHandler.getAllLeads();
        console.log("AQUIIIIIIIIII", leads)
        this.setState({
            loading: false,
            leads
        });
    }

    handleClickPendente = (id) => {
        this.props.history.push('lead/' + id)
    }

    handleClickAtendimento = (id) => {
        console.log(id)
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
                        <Grid item xs={12} sm={6}>
                            <div>
                                Pendentes
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
                                        {leads.map((lead) => (
                                            <TableRow key={lead.id} onClick={() => {
                                                this.handleClickPendente(lead.id)
                                            }}>
                                                <TableCell>{lead.infoPessoal.nomeConta}</TableCell>
                                                <TableCell>{lead.listaContatos.length}</TableCell>
                                                <TableCell>{'2 min'}</TableCell>
                                                <TableCell>{'5 min'}</TableCell>
                                                <TableCell>{'whatsapp'}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper style={{margin: 20, padding: 10}}>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <div>
                                Em Atendimento
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
                                        {leads.map((lead) => (
                                            <TableRow key={lead.id} onClick={() => {
                                                this.handleClickAtendimento(lead.id)
                                            }}>
                                                <TableCell>{lead.infoPessoal.nomeConta}</TableCell>
                                                <TableCell>{lead.listaContatos.length}</TableCell>
                                                <TableCell>{'2 min'}</TableCell>
                                                <TableCell>{'5 min'}</TableCell>
                                                <TableCell>{'whatsapp'}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </main>
        )
    }
}

export default Home;
