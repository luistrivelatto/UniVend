import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import {Typography} from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import { keyFormViaja, keyFormProfissao,
  EnumRespostaViagem, EnumRespostaProfissao } from '../../model/LeadScorePessoaFisica';

class FormFisico extends Component {
    constructor(props) {
        super(props);
    }

    handleChangeSelect = (event) => {
        this.setState({
          /* o estado sendo atualizado é o próprio objeto Lead que está nos props */
        });
        
        this.props.onValueChanged(event.target.name, event.target.value);
    }
    
    valueOrEmpty = function(value) {
      return value == undefined ? '' : value;
    }

    render() {
        const {lead} = this.props;
        
        if(lead == null) {
          return <div></div>;
        }

        return (
            <Paper style={{margin: 5, padding: 15}}>
                <Typography style={{fontSize: 18, fontWeight: 'bold'}}>Análise de Perfil: </Typography>

                <div style={{marginTop: 15}}>
                    <InputLabel>Viaja?</InputLabel>
                    <Select
                        value={this.valueOrEmpty(lead.valoresMatriz[keyFormViaja])}
                        onChange={this.handleChangeSelect}
                        name={keyFormViaja}
                        input={
                            <Input/>
                        }
                        style={{marginTop: 18}}
                        fullWidth
                    >
                      {
                        [...Array(EnumRespostaViagem.length).keys()]
                        .map((id) =>
                          (
                            <MenuItem value={id} key={id}>{EnumRespostaViagem.toString[id]}</MenuItem>
                          )
                        )
                      }
                    </Select>
                </div>

                <div style={{marginTop: 15}}>
                    <InputLabel>Profissão</InputLabel>
                    <Select
                        value={this.valueOrEmpty(lead.valoresMatriz[keyFormProfissao])}
                        onChange={this.handleChangeSelect}
                        name={keyFormProfissao}
                        input={
                            <Input/>
                        }
                        style={{marginTop: 18}}
                        fullWidth
                    >
                      {
                        [...Array(EnumRespostaProfissao.length).keys()]
                        .map((id) =>
                          (
                            <MenuItem value={id} key={id}>{EnumRespostaProfissao.toString[id]}</MenuItem>
                          )
                        )
                      }
                    </Select>
                </div>
            </Paper>
        )
    }
}

export default FormFisico;
