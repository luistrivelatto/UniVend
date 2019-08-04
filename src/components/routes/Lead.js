import React, {Component} from 'react'
import Loading from '../widgets/Loading';
import DataHandler from '../../data/DataHandler';
import ListContatos from '../widgets/ListContatos';
import DadosLead from '../widgets/DadosLead';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


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
        let lead = (await DataHandler.getAllLeads()).find((lead) => lead.id === this.state.id);
        console.log("AQUIIIIIIIIII", lead)
        this.setState({
            loading: false,
            lead
        });
    }

    handleChangeInput = event => {
        console.log('name: ', [event.currentTarget.name], 'value', event.currentTarget.value)
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    handleClickPendente = (id) => {
        console.log(id)
    }

    handleClickAtendimento = (id) => {
        console.log(id)
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
