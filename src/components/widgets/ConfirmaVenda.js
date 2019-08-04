import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import {Typography} from "@material-ui/core";

import TextField from '@material-ui/core/TextField';
import {getFormattedDate} from '../../utils/utils'
import {EnumOrigemLead} from '../../model/Lead';

class ConfirmaVenda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            venda: false
        };
    }

    handleChangeVenda = () => {
        const {venda} = this.state
        this.setState({venda: !venda})
    }

    render() {
        const {id, lead} = this.props;
        const {venda} = this.state;

        return (
            <div style={{margin: 20, padding: 15}}>
                <div>
                    <Typography align={'center'} style={{fontSize: 18, fontWeight: 'bold'}}> Confirmação de
                        Venda
                    </Typography>

                    <div>
                        <Typography align={'center'} style={{fontSize: 15}}>
                            {'Nome: ' + lead.infoPessoal.nomeConta}
                        </Typography>
                    </div>

                    <div>
                        <Typography align={'center'} style={{fontSize: 15}}>
                            {'Telefone: ' + lead.infoPessoal.telefone}
                            {console.log(lead)}
                        </Typography>
                    </div>
                    <div>
                        <Typography align={'center'} style={{fontSize: 15}}>
                            {'CPF/CNPJ: ' + lead.infoPessoal.CPF_CNPJ}
                            {console.log(lead)}
                        </Typography>
                    </div>
                    <Grid container>
                        <Grid align={'end'} item xs={12} sm={6}>
                            <Switch
                                checked={venda}
                                onChange={() => {
                                    this.handleChange('venda')
                                }}
                                value="venda"
                                color="primary"
                                inputProps={{'aria-label': 'primary checkbox'}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography align={'start'} style={{fontSize: 15, paddingTop: 15}}> Venda Foi
                                Fechada?
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default ConfirmaVenda;
