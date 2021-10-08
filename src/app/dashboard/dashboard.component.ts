import { Component, OnInit, ViewChild } from '@angular/core';
import { DadosService } from './dados.service';
import { NgForm} from '@angular/forms';
import { Dado } from './models';


declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('dashForm', {static:true}) dashForm!: NgForm;

  private dados: any
  public dado: Dado = {
    mes:[6,'junho'], 
    casos : 0,
    // hospitalizados: 0,
    // leitos: 0,
    // obitos: 0
  }

  constructor(private dadosService: DadosService) {}

  ngOnInit() {
  	this.dadosService.obterDados().subscribe(
  		dados => {
  			this.dados = dados;
  			this.init();
  		});
  }

  /**
   * Inicializa a API de gráficos com delay de 1 segundo,
   * o que permite a integração da API com o Angular.
   *
   * @return void
   */
  init(): void {
    if(typeof(google) !== 'undefined') {
      google.charts.load('current', {'packages':['corechart']});
      setTimeout(() => {
      	google.charts.setOnLoadCallback(this.exibirGraficos());
      }, 1000);
    }
  }
/**
 * metodo para chamar o grafico para ser exibido
 */
  enviarDados(){
    this.dadosService.enviarDados(this.dado)
    this.dadosService.obterDados().subscribe(
      dados =>{
        this.dados = dados;
        this.init()
      }
    )
  }

  /**
   * Método chamado assim que a API de gráficos é inicializada.
   * Reponsável por chamar os métodos geradores dos gráficos.
   *
   * @return void
   */
  exibirGraficos(): void {
  	this.exibirColumnChart_casos();
    // this.exibirColumnChart();
  	// this.exibirLineChart_leitos();
    // this.exibirLineChart_obitos();
  	
  }

  /**
   * Exibe o gráfico Column Chart.
   *
   * @return void
   */
   exibirColumnChart_casos(): void {
  	const el = document.getElementById('column_chart_casos');
    const chart = new google.visualization.ColumnChart(el);
    
    chart.draw(this.obterDataTable(), this.obterOpcoesCasos());
  }

  // exibirColumnChart_hospi(): void {
  // 	const el = document.getElementById('column_chart_hospitalizados');
  //   const chart = new google.visualization.ColumnChart(el);
    
  //   chart.draw(this.obterDataTable(), this.obterOpcoesHosp());
  // }
  
  /**
   * Exibe o gráfico Line Chart.
   *
   * @return void
   */
  // exibirLineChart_leitos(): void {
  // 	const el = document.getElementById('line_chart_leitos');
  //   const chart = new google.visualization.LineChart(el);
    
  //   chart.draw(this.obterDataTable(), this.obterOpcoesLeitos());
  // }

  // exibirLineChart_obitos(): void {
  // 	const el = document.getElementById('line_chart_obitos');
  //   const chart = new google.visualization.LineChart(el);
    
  //   chart.draw(this.obterDataTable(), this.obterOpcoesObitos());
  // }

  

  /**
   * Cria e retorna o objeto DataTable da API de gráficos,
   * responsável por definir os dados do gráfico.
   *
   * @return any
   */
  obterDataTable(): any { // data tablo é o formato dos dados
  	const data = new google.visualization.DataTable();

    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Quantidade');
    data.addRows(this.dados);

    return data;
  }

  /**
   * Retorna as opções do gráfico, que incluem o título
   * e tamanho do gráfico.
   *
   * @return any
   */
  obterOpcoesCasos(): any {
  	return {
    	'title': 'Demonstrativo de números de casos de COVID-19',
        'width': 800,
        'height': 600
    };
  }

  // obterOpcoesHosp(): any {
  // 	return {
  //   	'title': 'Demonstrativo de números de pessoas hospitalizadas',
  //       'width': 500,
  //       'height': 300
  //   };
  // }

  // obterOpcoesLeitos(): any {
  // 	return {
  //   	'title': 'Demonstrativo de números de leitos ocupados',
  //       'width': 500,
  //       'height': 300
  //   };
  // }

  // obterOpcoesObitos(): any {
  // 	return {
  //   	'title': 'Demonstrativo de números de óbitos por COVID-19',
  //       'width': 500,
  //       'height': 300
  //   };
  // }

}
