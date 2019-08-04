import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import {Typography} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

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
                {contatos.map((contato) => (
                    <div>

                        <TextField
                            disabled
                            onChange={this.handleChangeInput}
                            label="Tipo de Contato"
                            value={contato.formaContato}
                            style={{paddingLeft: 8}}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            disabled
                            onChange={this.handleChangeInput}
                            label="Sdr"
                            value={contato.nomeSdrResponsavel}
                            style={{paddingLeft: 8}}
                            margin="normal"
                            fullWidth
                        />


                        <TextField
                            disabled
                            onChange={this.handleChangeInput}
                            label="Observações"
                            value={contato.observacoes}
                            style={{paddingLeft: 8}}
                            margin="normal"
                            fullWidth
                        />

                        <TextField
                            disabled
                            type={'date'}
                            onChange={this.handleChangeInput}
                            label="Data de contato"
                            value={new Date(contato.timestamp)}
                            style={{paddingLeft: 8}}
                            margin="normal"
                            fullWidth
                        />
                    </div>
                ))}
            </Paper>
        )
    }
}

export default ListContatos;
