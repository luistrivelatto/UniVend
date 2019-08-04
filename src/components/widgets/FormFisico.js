import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import {Typography} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

class FormFisico extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viaja: '',
            profissao: ''
        };
    }


    handleChangeInput = event => {
        console.log('name: ', [event.currentTarget.name], 'value', event.currentTarget.value)
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    handleChangeSelect = (event) => {
        console.log('name: ', event.target.value)
        this.setState({
            status: event.target.value
        })
    }

    render() {
        const {lead} = this.props;

        return (
            <Paper style={{margin: 5, padding: 15}}>
                <Typography style={{fontSize: 18, fontWeight: 'bold'}}>Dados do Lead: </Typography>
                <InputLabel>Viaja?</InputLabel>
                <Select
                    value={viaja}
                    onChange={this.handleChangeSelect}
                    name="viaja"
                    input={
                        <Input/>
                    }
                    style={{marginTop: 18}}
                    fullWidth
                >
                    <MenuItem value={0}>Não</MenuItem>
                    <MenuItem value={1}>Sim, no Estado</MenuItem>
                    <MenuItem value={2}>Sim, no País</MenuItem>
                    <MenuItem value={3}>Sim, para o Exterior</MenuItem>
                    <MenuItem value={4}>Não informado</MenuItem>
                </Select>

                <InputLabel>Profissão</InputLabel>
                <Select
                    value={profissao}
                    onChange={this.handleChangeSelect}
                    name="Profissao"
                    input={
                        <Input/>
                    }
                    style={{marginTop: 18}}
                    fullWidth
                >
                    <MenuItem value={0}>Não informada</MenuItem>
                    <MenuItem value={1}>Engenheiro</MenuItem>
                    <MenuItem value={2}>Advogado</MenuItem>
                    <MenuItem value={3}>Médico</MenuItem>
                    <MenuItem value={4}>Outro</MenuItem>
                </Select>

            </Paper>
        )
    }
}

export default FormFisico;
