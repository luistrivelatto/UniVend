import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import {EnumFormaContato} from "../../model/Lead";
import {getFormattedDate} from '../../utils/utils'


class ListContatos extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {contatos} = this.props;

        return (
            <Paper style={{margin: 5, padding: 15}}>
                <Typography style={{fontSize: 18, fontWeight: 'bold'}}>Ultimos contatos: </Typography>
                <Grid container>
                    <Grid item xs={12} sm={3}>
                        <Typography style={{fontSize: 15, fontWeight: 'bold'}}>Forma de Contato</Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography style={{fontSize: 15, fontWeight: 'bold'}}>SDR Responsável</Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography style={{fontSize: 15, fontWeight: 'bold'}}>Observações</Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography style={{fontSize: 15, fontWeight: 'bold'}}>Data de contato</Typography>
                    </Grid>
                </Grid>
                {contatos.map((contato) => (
                    <Grid container>
                        <Grid item xs={12} sm={3}>
                            <div>{EnumFormaContato.toString[contato.formaContato]}</div>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <div>{contato.nomeSdrResponsavel}</div>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <div>{contato.observacoes}</div>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <div>{getFormattedDate(contato.timestamp)}</div>
                        </Grid>
                    </Grid>
                ))}
            </Paper>
        )
    }
}

export default ListContatos;
