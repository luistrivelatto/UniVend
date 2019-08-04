import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import {Typography} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import {getFormattedDate} from '../../utils/utils'

class DadosLead extends Component {
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
                    label="Telefone"
                    value={lead.infoPessoal.telefone}
                    style={{paddingLeft: 8}}
                    margin="normal"
                    fullWidth
                />

                <TextField
                    onChange={this.handleChangeInput}
                    name={'nome'}
                    label="Email"
                    value={lead.infoPessoal.email}
                    style={{paddingLeft: 8}}
                    margin="normal"
                    fullWidth
                />

                <TextField
                    onChange={this.handleChangeInput}
                    name={'nome'}
                    label="CPF/CNPJ"
                    value={lead.infoPessoal.CPF_CNPJ}
                    style={{paddingLeft: 8}}
                    margin="normal"
                    fullWidth
                />

                <TextField
                    onChange={this.handleChangeInput}
                    name={'cidade'}
                    label="Cidade"
                    value={lead.infoPessoal.cidade}
                    style={{paddingLeft: 8}}
                    margin="normal"
                    fullWidth
                />

                <TextField
                    name="Born date"
                    label="Data de Nascimento"
                    value={getFormattedDate(lead.infoPessoal.dataNascimento)}
                    InputLabelProps={{shrink: true, required: true}}
                    type="date"
                    defaultValue={lead.infoPessoal.dataNascimento}
                />

                <TextField
                    onChange={this.handleChangeInput}
                    name={'nacionalidade'}
                    label="Nacionalidade"
                    value={lead.infoPessoal.nacionalidade}
                    style={{paddingLeft: 8}}
                    margin="normal"
                    fullWidth
                />
            </Paper>
        )
    }
}

export default DadosLead;
