import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import {Typography} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

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
                    label="Nome"
                    value={lead.infoPessoal.telefone}
                    style={{paddingLeft: 8}}
                    margin="normal"
                    fullWidth
                />

                <TextField
                    onChange={this.handleChangeInput}
                    name={'nome'}
                    label="Nome"
                    value={lead.infoPessoal.email}
                    style={{paddingLeft: 8}}
                    margin="normal"
                    fullWidth
                />


                <TextField
                    onChange={this.handleChangeInput}
                    name={'nome'}
                    label="Nome"
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
                    onChange={this.handleChangeInput}
                    name={'bornDate'}
                    label="Data de Nascimento"
                    type='date'
                    defaultValue="11-04-1992"
                    style={{paddingLeft: 8}}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    id="date"
                    label="Birthday"
                    type="date"
                    defaultValue="2017-05-24"
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
