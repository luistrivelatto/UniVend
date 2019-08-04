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
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Spinner } from '@blueprintjs/core';
import Chart from 'react-google-charts';
import {
    getDuracaoDesdeUltimoContato, getDuracaoTotal, isLeadPendente,
    isLeadEmAndamento, getDescricaoProximaAcaoOuStatus,
    leadEstaDentroDePeriodoDeTempo, leadNovoDentroDePeriodoDeTempo, EnumOrigemLead
} from "../../model/Lead";
import {EnumTipoStatusLead, EnumMotivoCongelado} from "../../model/StatusLead";
import {getHumanReadableDuration, timestampDentroDePeriodo, arrayAverage} from '../../utils/utils';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            leads: null,
            comecoPeriodoString: '2019-08-01',
            fimPeriodoString: '2019-08-04',
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
    
    getLeadsPeriodo() {
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
    
    getIndiceDiaNoPeriodo(timestamp) {
      const milisPorDia = 1000 * 60 * 60 * 24;
      return Math.floor((timestamp - this.state.comecoPeriodo) / milisPorDia);
    }
    
    getDataGraficoDesempenhoPorDia() {
      const milisPorDia = 1000 * 60 * 60 * 24;
      let numDias = Math.ceil((this.state.fimPeriodo - this.state.comecoPeriodo) / milisPorDia);
      
      let novosLeads = new Array(numDias).fill(0);
      let contatosRealizados = new Array(numDias).fill(0);
      let vendasFechadas = new Array(numDias).fill(0);
      let leadsCongelados = new Array(numDias).fill(0);
      
      for(var novoLead of this.getNovosLeads()) {
        novosLeads[this.getIndiceDiaNoPeriodo(novoLead.dataOrigemLead)]++;
      }
      
      for(var contato of this.getContatosRealizados()) {
        contatosRealizados[this.getIndiceDiaNoPeriodo(contato.timestamp)]++;
      }
      
      for(var lead of this.getLeadsPeriodo()) {
        if(lead.status.tipo == EnumTipoStatusLead.vendaFechada) {
          vendasFechadas[this.getIndiceDiaNoPeriodo(lead.status.dataFechouVenda)]++;
        } else if(lead.status.tipo == EnumTipoStatusLead.congelado) {
          leadsCongelados[this.getIndiceDiaNoPeriodo(lead.status.dataDeixouDeSerLead)]++;
        }
      }
      
      let dados = [
        ['x', 'Novos Leads', 'Contatos Realizados', 'Vendas Fechadas', 'Congelados']
      ];
      
      for(var i = 0; i < numDias; i++) {
        dados.push([
          i, novosLeads[i], contatosRealizados[i], vendasFechadas[i], leadsCongelados[i]
        ]);
      }
      
      return dados;
    }
    
    getDataGraficoResultadoDosLeads() {
      let leads = this.getLeadsPeriodo();
      let resultados = new Array(5).fill(0);
      
      for(var lead of leads) {
        resultados[lead.status.tipo]++;
      }
      
      return [
          ['Resultado', 'Quantidade'],
          [EnumTipoStatusLead.toString[EnumTipoStatusLead.ativo], resultados[EnumTipoStatusLead.ativo]],
          [EnumTipoStatusLead.toString[EnumTipoStatusLead.congelado], resultados[EnumTipoStatusLead.congelado]],
          [EnumTipoStatusLead.toString[EnumTipoStatusLead.repassadoParaVenda], resultados[EnumTipoStatusLead.repassadoParaVenda]],
          [EnumTipoStatusLead.toString[EnumTipoStatusLead.vendaFechada], resultados[EnumTipoStatusLead.vendaFechada]],
          [EnumTipoStatusLead.toString[EnumTipoStatusLead.congeladoAposRepasseVenda], resultados[EnumTipoStatusLead.congeladoAposRepasseVenda]],
      ];
    }
    
    getDataGraficoMotivosLeadsCongelados() {
      let leads = this.getLeadsPeriodo().filter((lead) => lead.status.tipo == EnumTipoStatusLead.congelado);
      let resultados = new Array(5).fill(0);
      
      for(var lead of leads) {
        resultados[lead.status.motivo]++;
      }
      
      return [
          ['Motivo', 'Quantidade'],
          [EnumMotivoCongelado.toString[EnumMotivoCongelado.concorrente], resultados[EnumMotivoCongelado.concorrente]],
          [EnumMotivoCongelado.toString[EnumMotivoCongelado.preco], resultados[EnumMotivoCongelado.preco]],
          [EnumMotivoCongelado.toString[EnumMotivoCongelado.semInteresse], resultados[EnumMotivoCongelado.semInteresse]],
          [EnumMotivoCongelado.toString[EnumMotivoCongelado.naoConseguiuContato], resultados[EnumMotivoCongelado.naoConseguiuContato]],
          [EnumMotivoCongelado.toString[EnumMotivoCongelado.outro], resultados[EnumMotivoCongelado.outro]],
      ];
    }
    
    getDataGraficoLeadsPorCidade() {
      let leads = this.getLeadsPeriodo();
      let cidadesCont = {};
      
      for(var lead of leads) {
        let cidade = lead.infoPessoal.cidade;
        if(cidade != undefined) {
          if(cidadesCont[cidade] == undefined) {
            cidadesCont[cidade] = 0;
          }
          cidadesCont[cidade]++;
        }
      }
      
      let dados = [
        ['Cidade', 'Quantidade'],
      ];
      
      for(var cidade in cidadesCont) {
        dados.push([
          cidade, cidadesCont[cidade]
        ]);
      }
      
      return dados;
    }
    
    getDataGraficoOrigemDosLeads() {
      let leads = this.getLeadsPeriodo();
      let resultados = new Array(4).fill(0);
      
      for(var lead of leads) {
        resultados[lead.origemLead]++;
      }
      
      return [
          ['Origem', 'Quantidade'],
          [EnumOrigemLead.toString[EnumOrigemLead.marketing], resultados[EnumOrigemLead.marketing]],
          [EnumOrigemLead.toString[EnumOrigemLead.simulador], resultados[EnumOrigemLead.simulador]],
          [EnumOrigemLead.toString[EnumOrigemLead.formularioSite], resultados[EnumOrigemLead.formularioSite]],
          [EnumOrigemLead.toString[EnumOrigemLead.bioMeek], resultados[EnumOrigemLead.bioMeek]],
      ];
    }

    handleChangeDate = (event) => {
      
      if(event.target.name == 'comecoPeriodoString') {
        this.setState({
          comecoPeriodo: Date.parse(event.target.value),
          comecoPeriodoString: event.target.value
        });
      } else {
        this.setState({
          fimPeriodo: Date.parse(event.target.value),
          fimPeriodoString: event.target.value
        });
      }
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
                
                    <Grid item xs={12} sm={6}>
                          <TextField
                                onChange={this.handleChangeDate}
                                name={'comecoPeriodoString'}
                                label="Começo do Período"
                                value={this.state.comecoPeriodoString}
                                type="date"
                                style={{paddingLeft: 8}}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                          <TextField
                                onChange={this.handleChangeDate}
                                name={'fimPeriodoString'}
                                label="Fim do Período"
                                value={this.state.fimPeriodoString}
                                type="date"
                                style={{paddingLeft: 8}}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                    </Grid>
                    
                    <br/><br/>

                    <Grid item xs={12} sm={2}>
                        <Card style={{margin: 6, padding: 0}}>
                            <div><h4 align="center">TOTAL DE LEADS</h4></div>
                            <div><h1 align="center">{ this.getLeadsPeriodo().length }</h1></div>
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
