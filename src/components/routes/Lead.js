import React, {Component} from 'react'
import Loading from '../widgets/Loading';
import DataHandler from '../../data/DataHandler';

class Lead extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            loading: true,
            lead: {}
        };
    }

    async componentDidMount() {
        let lead = (await DataHandler.getAllLeads()).find((lead) => lead.id === this.state.id);
        console.log("AQUIIIIIIIIII", lead)
        this.setState({
            loading: false,
            lead
        });
    }

    handleClickPendente = (id) => {
        console.log(id)
    }

    handleClickAtendimento = (id) => {
        console.log(id)
    }


    render() {
        const {lead} = this.state
        if (this.state.loading) {
            return (
                <Loading/>
            );
        }
        return (
            <div>
                lead
            </div>
        )
    }
}

export default Lead;
