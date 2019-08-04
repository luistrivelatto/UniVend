import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import {Typography} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import {getFormattedDate} from '../../utils/utils'
import {EnumOrigemLead} from '../../model/Lead';


class DadosLead extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {lead, editable} = this.props;

        return (
            <Paper style={{margin: 5, padding: 15}}>
                <Typography style={{fontSize: 18, fontWeight: 'bold'}}>Dados do Lead:</Typography>
                <TextField
                    editable={editable}
                    onChange={this.handleChangeInput}
                    name={'nome'}
                    label="Nome"
                    value={lead.infoPessoal.nomeConta}
                    style={{paddingLeft: 8}}
                    margin="normal"
                    fullWidth
                />

                <TextField
                    editable={editable}
                    onChange={this.handleChangeInput}
                    name={'nome'}
                    label="Telefone"
                    value={lead.infoPessoal.telefone}
                    style={{paddingLeft: 8}}
                    margin="normal"
                    fullWidth
                />

                <TextField
                    editable={editable}
                    onChange={this.handleChangeInput}
                    name={'nome'}
                    label="Email"
                    value={lead.infoPessoal.email}
                    style={{paddingLeft: 8}}
                    margin="normal"
                    fullWidth
                />

                <TextField
                    editable={editable}
                    onChange={this.handleChangeInput}
                    name={'nome'}
                    label="CPF/CNPJ"
                    value={lead.infoPessoal.CPF_CNPJ}
                    style={{paddingLeft: 8}}
                    margin="normal"
                    fullWidth
                />

                <TextField
                    editable={editable}
                    onChange={this.handleChangeInput}
                    name={'cidade'}
                    label="Cidade"
                    value={lead.infoPessoal.cidade}
                    style={{paddingLeft: 8}}
                    margin="normal"
                    fullWidth
                />

                <TextField
                    editable={editable}
                    onChange={this.handleChangeInput}
                    name={'Data de Nascimento'}
                    label="Data de Nascimento"
                    value={getFormattedDate(lead.infoPessoal.dataNascimento)}
                    style={{paddingLeft: 8}}
                    InputLabelProps={{shrink: true, required: true}}
                    type="date"
                />

                <TextField
                    editable={editable}
                    onChange={this.handleChangeInput}
                    name={'nacionalidade'}
                    label="Nacionalidade"
                    value={lead.infoPessoal.nacionalidade}
                    style={{paddingLeft: 8}}
                    margin="normal"
                    fullWidth
                />

                <TextField
                    editable={editable}
                    onChange={this.handleChangeInput}
                    name={'origem'}
                    label="Origem do Lead"
                    value={EnumOrigemLead.toString[lead.origemLead]}
                    style={{paddingLeft: 8}}
                    margin="normal"
                    fullWidth
                />

                <TextField
                    editable={editable}
                    onChange={this.handleChangeInput}
                    name={'sdr'}
                    label="SDR atual"
                    value={lead.nomeSdrResponsavel}
                    style={{paddingLeft: 8}}
                    margin="normal"
                    fullWidth
                />
            </Paper>
        )
    }
}

export default DadosLead;
