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
import {
    getDuracaoDesdeUltimoContato, getDuracaoTotal, isLeadPendente,
    isLeadEmAndamento, getDescricaoProximaAcaoOuStatus
} from "../../model/Lead";
import {getHumanReadableDuration} from '../../utils/utils';

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
            <Paper style={{margin: 20, padding: 15}}>
                <Grid container>
                    <Grid item xs={12} sm={12}>
                        <Typography style={{fontSize: 18, fontWeight: 'bold'}}> Dashboard Gerencial</Typography>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Card style={{margin: 10, padding: 10}}>
                            <div>card 1</div>
                            <div>card 1</div>
                            <div>card 1</div>
                            <div>card 1</div>
                            <div>card 1</div>
                            <div>card 1</div>
                            <div>card 1</div>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card style={{margin: 10, padding: 10}}>
                            <div>card 2</div>
                            <div>card 2</div>
                            <div>card 2</div>
                            <div>card 2</div>
                            <div>card 2</div>
                            <div>card 2</div>
                            <div>card 2</div>
                        </Card>

                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Card style={{margin: 10, padding: 10}}>
                            <div>card 3</div>
                            <div>card 3</div>
                            <div>card 3</div>
                            <div>card 3</div>
                            <div>card 3</div>
                            <div>card 3</div>
                            <div>card 3</div>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={7}>
                        <Card style={{margin: 10, padding: 10}}>
                            <Chart
                                width={'500px'}
                                height={'400px'}
                                chartType="LineChart"
                                data={this.state.dados}
                                options={{
                                    hAxis: {
                                        title: 'Time',
                                    },
                                    vAxis: {
                                        title: 'Popularity',
                                    }
                                }}
                                rootProps={{'data-testid': '2'}}
                            />
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={5}>
                        <Card style={{margin: 10, padding: 10}}>
                            <Chart
                                width={'500px'}
                                height={'300px'}
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ['Task', 'Hours per Day'],
                                    ['Work', 11],
                                    ['Eat', 2],
                                    ['Commute', 2],
                                    ['Watch TV', 2],
                                    ['Sleep', 7],
                                ]}
                                options={{
                                    title: 'My Daily Activities',
                                }}
                                rootProps={{'data-testid': '1'}}
                            />
                        </Card>
                    </Grid>


                    <Grid item xs={12} sm={7}>
                        <Card style={{margin: 10, padding: 10}}>
                            <Chart
                                width={'500px'}
                                height={'300px'}
                                chartType="BarChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ['City', '2010 Population', '2000 Population'],
                                    ['New York City, NY', 8175000, 8008000],
                                    ['Los Angeles, CA', 3792000, 3694000],
                                    ['Chicago, IL', 2695000, 2896000],
                                    ['Houston, TX', 2099000, 1953000],
                                    ['Philadelphia, PA', 1526000, 1517000],
                                ]}
                                options={{
                                    title: 'Population of Largest U.S. Cities',
                                    chartArea: {width: '50%'},
                                    hAxis: {
                                        title: 'Total Population',
                                        minValue: 0,
                                    },
                                    vAxis: {
                                        title: 'City',
                                    },
                                }}
                                // For tests
                                rootProps={{'data-testid': '1'}}
                            />
                        </Card>

                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default Dashboard;
