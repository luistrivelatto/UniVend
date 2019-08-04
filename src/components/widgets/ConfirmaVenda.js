import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
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

    handleChange = () => {
        const {venda} = this.state
        this.setState({venda: !venda})
    }

    render() {
        const {id} = this.props;
        const {venda} = this.state;

        return (
            <Paper style={{margin: 20, padding: 15}}>
                <div>
                    <Typography> Confirmação de Venda</Typography>
                    <Switch
                        checked={venda}
                        onChange={() => {
                            this.handleChange('venda')
                        }}
                        value="venda"
                        color="primary"
                        inputProps={{'aria-label': 'primary checkbox'}}
                    />
                </div>
            </Paper>
        )
    }
}

export default ConfirmaVenda;
