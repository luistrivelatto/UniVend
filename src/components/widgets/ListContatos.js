import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import {Typography} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
                            value="2017-05-24"
                            style={{paddingLeft: 8}}
                            margin="normal"
                            fullWidth
                        />

                        {console.log(new Date(contato.timestamp).getFullYear() + '-' + new Date(contato.timestamp).getMonth() + '-' + new Date(contato.timestamp).getDate())}

                        <Button variant={"contained"} color={"primary"}>Novo Contato </Button>
                    </div>
                ))}
            </Paper>
        )
    }
}

export default ListContatos;
