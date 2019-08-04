import React, {Component} from 'react'
import Loading from '../widgets/Loading';
import DataHandler from '../../data/DataHandler';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Chart from 'react-google-charts';
import { getDuracaoDesdeUltimoContato, getDuracaoTotal, isLeadPendente,
  isLeadEmAndamento, getDescricaoProximaAcaoOuStatus } from "../../model/Lead";
import { getHumanReadableDuration } from '../../utils/utils';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            leads: null,
            dados: [
                  ['x', 'dogs', 'cats'],
                  [0, 0, 0],
                  [1, 10, 5],
                  [2, 20, 15],
                  [3, 17, 9],
                  [4, 18, 10],
                  [5, 9, 5],
                  [6, 11, 3],
                  [7, 27, 19],
                ]
        };
    }

    async componentDidMount() {
        let leads = await DataHandler.getAllLeads();
        this.setState({
            loading: false,
            leads
        });
        
        setInterval(() => {
          this.setState({
            dados: [
                  ['x', 'dogs', 'cats'],
                  [0, 0, 0],
                  [1, 20, 5],
                  [2, 30, 15],
                  [3, 17, 9],
                  [4, 18, 10],
                  [5, 9, 5],
                  [6, 11, 3],
                  [7, 27, 19],
                ]
          });
        }, 2000);
    }
    
    render() {
        const {leads} = this.state
        if (this.state.loading) {
            return (
                <Loading/>
            );
        }
        return (
          <div>
              <Chart
                width={'600px'}
                height={'400px'}
                chartType="LineChart"
                data={this.state.dados}
                options={{
                  hAxis: {
                    title: 'Time',
                  },
                  vAxis: {
                    title: 'Popularity',
                  },
                  animation: {
                    duration: 1000,
                    easing: 'out',
                    startup: true,
                  }
                }}
                rootProps={{ 'data-testid': '2' }}
              />
            
            </div>
        )
    }
}

export default Dashboard;
