import { Color } from './../../../../static-data/colors';
import { Component, OnInit } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'vex-modal-graficas-articulo',
  templateUrl: './modal-graficas-articulo.component.html',
  styleUrls: ['./modal-graficas-articulo.component.scss']
})
export class ModalGraficasArticuloComponent implements OnInit {

  public labels = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio']
  public data = {
    labels: this.labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [1000,2000,3000,4000,5000,6000,7000],
        backgroundColor: ['#85C1E9','#85C1E9','#85C1E9','#85C1E9','#85C1E9','#85C1E9','#85C1E9'],
        borderColor: ['#3D7BA5','#3D7BA5','#3D7BA5','#3D7BA5','#3D7BA5','#3D7BA5','#3D7BA5'],
        borderWidth: 1,

      },
      {
        label: 'Dataset 2',
        data: [1500,2500,3500,4500,5500,6500,7500],
        backgroundColor: ['#76D7C4','#76D7C4','#76D7C4','#76D7C4','#76D7C4','#76D7C4','#76D7C4'],
        borderColor: ['#049D7F','#049D7F','#049D7F','#049D7F','#049D7F','#049D7F','#049D7F'],
        borderWidth: 1,

      },
      {
        label: 'Dataset 3',
        data: [700,800,600,400,300,200,100],
        backgroundColor: ['#58D68D','#58D68D','#58D68D','#58D68D','#58D68D','#58D68D','#58D68D'],
        borderColor: ['#3E7B58','#3E7B58','#3E7B58','#3E7B58','#3E7B58','#3E7B58','#3E7B58'],
        borderWidth: 1,

      },
    ]
  };

  public config = {
    type: 'bar',
    data: this.data,
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Bar Chart - Stacked'
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true
        }
      }
    }
  };



  constructor() {

  }

  ngOnInit(): void {
    var myChart = new Chart("myChart",
    {
      type: 'bar',
      data: this.data,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked'
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      }
    }
    );
  }







  onSelect(event) {
    console.log(event);
  }

}
