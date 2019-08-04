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
import { Spinner } from '@blueprintjs/core';
import Chart from 'react-google-charts';
import {
    getDuracaoDesdeUltimoContato, getDuracaoTotal, isLeadPendente,
    isLeadEmAndamento, getDescricaoProximaAcaoOuStatus,
    leadEstaDentroDePeriodoDeTempo, leadNovoDentroDePeriodoDeTempo
} from "../../model/Lead";
import {EnumTipoStatusLead} from "../../model/StatusLead";
import {getHumanReadableDuration, timestampDentroDePeriodo, arrayAverage} from '../../utils/utils';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            leads: null,
            comecoPeriodo: new Date('2019-08-01'),
            fimPeriodo: new Date(),
        };
    }

    async componentDidMount() {
        let leads = await DataHandler.getAllLeads();
        this.setState({
            loading: false,
            leads
        });
    }
    
    getTotalLeads() {
      return this.state.leads.filter((lead) => leadEstaDentroDePeriodoDeTempo(lead, this.state.comecoPeriodo, this.state.fimPeriodo));
    }
    
    getNovosLeads() {
      return this.state.leads.filter((lead) => timestampDentroDePeriodo(lead.dataOrigemLead, this.state.comecoPeriodo, this.state.fimPeriodo));
    }
    
    getContatosRealizados() {
      let contatos = [];
      for(var lead of this.state.leads) {
        for(var contato of lead.listaContatos) {
          if(timestampDentroDePeriodo(contato.timestamp, this.state.comecoPeriodo, this.state.fimPeriodo)) {
            contatos.push(contato);
          }
        }
      }
      return contatos;
    }
    
    calcularVendasFinalizadas() {
      return this.state.leads.filter((lead) => lead.status.tipo == EnumTipoStatusLead.vendaFechada).length;
    }
    
    calcularTempoMedioAtePrimeiroContato() {
      let temposAtePrimeiroContato = [];
      for(var lead of this.state.leads) {
        if(timestampDentroDePeriodo(lead.dataOrigemLead, this.state.comecoPeriodo, this.state.fimPeriodo) &&
           lead.listaContatos.length > 0) {
            temposAtePrimeiroContato.push(lead.listaContatos[0].timestamp - lead.dataOrigemLead);
        }
      }
      
      return arrayAverage(temposAtePrimeiroContato);
    }
    
    getStringTempoMedioAtePrimeiroContato() {
      let tempoMedio = this.calcularTempoMedioAtePrimeiroContato();
      if(tempoMedio == null) {
        return '-';
      }
      return getHumanReadableDuration(tempoMedio);
    }
    
    calcularTempoMedioAteFinalizacao() {
      let temposAteFinalizacao = [];
      for(var lead of this.state.leads) {
        if(lead.status.dataDeixouDeSerLead != undefined) {
          temposAteFinalizacao.push(lead.status.dataDeixouDeSerLead - lead.dataOrigemLead);
        }
      }
      
      return arrayAverage(temposAteFinalizacao);
    }
    
    getStringTempoMedioAteFinalizacao() {
      let tempoMedio = this.calcularTempoMedioAteFinalizacao();
      if(tempoMedio == null) {
        return '-';
      }
      return getHumanReadableDuration(tempoMedio);
    }
    
    getDataGraficoDesempenhoPorDia() {
      return [
          ['x', 'Novos Leads', 'Contatos Realizados', 'Vendas Fechadas', 'Congelados'],
          [0, 5, 2, 3, 6],
          [1, 10, 5, 3, 4],
          [2, 20, 15, 3, 8],
          [3, 17, 9, 4, 1],
      ];
    }
    
    getDataGraficoResultadoDosLeads() {
      return [
          ['Resultado', 'Quantidade'],
          ['Ativo', 11],
          ['Repassado para vendas', 2],
          ['Congelado', 2],
      ];
    }
    
    getDataGraficoMotivosLeadsCongelados() {
      return [
          ['Motivo', 'Quantidade'],
          ['Preco', 11],
          ['Concorrente', 5],
          ['Não tinha interesse', 2],
          ['Outro', 10],
      ];
    }
    
    getDataGraficoLeadsPorCidade() {
      return [
          ['Cidade', 'Quantidade'],
          ['Cascavel', 11],
          ['Toledo', 5],
          ['Corbelia', 2],
      ];
    }
    
    getDataGraficoOrigemDosLeads() {
      return [
          ['Origem', 'Quantidade'],
          ['Marketing', 11],
          ['Simulador', 5],
          ['Site', 2],
      ];
    }

    render() {
        const {leads} = this.state;
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

                    <Grid item xs={12} sm={2}>
                        <Card style={{margin: 6, padding: 0}}>
                            <div><h4 align="center">TOTAL DE LEADS</h4></div>
                            <div><h1 align="center">{ this.getTotalLeads().length }</h1></div>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Card style={{margin: 6, padding: 0}}>
                            <div><h4 align="center">LEADS NOVOS</h4></div>
                            <div><h1 align="center">{ this.getNovosLeads().length }</h1></div>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Card style={{margin: 6, padding: 0}}>
                            <div><h4 align="center">CONTATOS REALIZADOS</h4></div>
                            <div><h1 align="center">{ this.getContatosRealizados().length }</h1></div>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Card style={{margin: 6, padding: 0}}>
                            <div><h4 align="center">VENDAS FINALIZADAS</h4></div>
                            <div><h1 align="center">{ this.calcularVendasFinalizadas() }</h1></div>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Card style={{margin: 6, padding: 0}}>
                            <div><h4 align="center">TEMPO MÉDIO ATÉ 1º CONTATO</h4></div>
                            <div><h1 align="center">{ this.getStringTempoMedioAtePrimeiroContato() }</h1></div>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Card style={{margin: 6, padding: 0}}>
                            <div><h4 align="center">TEMPO MÉDIO ATÉ FINALIZAÇÃO</h4></div>
                            <div><h1 align="center">{ this.getStringTempoMedioAteFinalizacao() }</h1></div>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={7}>
                        <Card style={{margin: 10, padding: 10}}>
                            <Chart
                                height={'400px'}
                                chartType="LineChart"
                                loader={<Spinner />}
                                data={ this.getDataGraficoDesempenhoPorDia() }
                                options={{
                                    title: 'Desempenho por dia',
                                    hAxis: {
                                        title: 'Dias',
                                    }
                                }}
                            />
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={5}>
                        <Card style={{margin: 10, padding: 10}}>
                            <Chart
                                height={'400px'}
                                chartType="PieChart"
                                loader={<Spinner />}
                                data={ this.getDataGraficoResultadoDosLeads() }
                                options={{
                                    title: 'Resultado dos leads',
                                }}
                            />
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Card style={{margin: 10, padding: 10}}>
                            <Chart
                                height={'300px'}
                                chartType="PieChart"
                                loader={<Spinner />}
                                data={ this.getDataGraficoMotivosLeadsCongelados() }
                                options={{
                                    title: 'Motivos de leads congelados',
                                }}
                            />
                        </Card>
                    </Grid>


                    <Grid item xs={12} sm={4}>
                        <Card style={{margin: 10, padding: 10}}>
                            <Chart
                                height={'300px'}
                                chartType="PieChart"
                                loader={<Spinner />}
                                data={ this.getDataGraficoLeadsPorCidade() }
                                options={{
                                    title: 'Leads por cidade',
                                }}
                            />
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Card style={{margin: 10, padding: 10}}>
                            <Chart
                                height={'300px'}
                                chartType="PieChart"
                                loader={<Spinner />}
                                data={ this.getDataGraficoOrigemDosLeads() }
                                options={{
                                    title: 'Origem dos leads',
                                }}
                            />
                        </Card>
                    </Grid>
                    
                </Grid>
            </Paper>
        )
    }
}

export default Dashboard;
