import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import {Typography} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

class FormFisico extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {lead} = this.props;

        return (
            <Paper style={{margin: 5, padding: 15}}>
                <Typography style={{fontSize: 18, fontWeight: 'bold'}}>Dados do Lead: </Typography>
                <TextField
                    onChange={this.handleChangeInput}
                    name={'nome'}
                    label="Nome"
                    value={lead.infoPessoal.nomeConta}
                    style={{paddingLeft: 8}}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    onChange={this.handleChangeInput}
                    name={'nome'}
                    label="Nome"
                    value={lead.infoPessoal.telefone}
                    style={{paddingLeft: 8}}
                    margin="normal"
                    fullWidth
                />
            </Paper>
        )
    }
}

export default FormFisico;