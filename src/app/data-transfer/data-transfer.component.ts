import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import tableData from '../../assets/table-data.json';
import { color } from 'highcharts';

@Component({
  selector: 'app-data-transfer',
  templateUrl: './data-transfer.component.html',
  styleUrls: ['./data-transfer.component.scss'],
})
export class DataTransferComponent implements OnInit {
  chart: any;
  dataTable: any = [];
  dateArray: any = [];
  obj = {
    name: '',
    y: 5,
    color: '#7EC8E3',
  };
  dataTransferArray: any = [];

  constructor() {}

  ngOnInit(): void {
    this.dataTable = tableData.data;
    this.dataTable.forEach((element: any) => {
      if (element.date) {
        this.dateArray.push(element.date);
        this.obj = {
          name: element.date,
          y: element.bytes_transferred,
          color: '#7EC8E3',
        };
        if (element.action_taken == 'Allowed') {
          this.obj.color = '#7EC8E3';
        } else {
          this.obj.color = '#FF0000';
        }
        this.dataTransferArray.push(this.obj);
      }
    });

    this.chart = new Chart({
      chart: {
        type: 'column',
        height: 225,
      },
      title: {
        text: 'Daily Data Transfer',
      },
      xAxis: {
        categories: this.dateArray,
      },
      yAxis: {
        title: {
          text: 'Bytes Transferred',
        },
      },
      series: [
        {
          type: 'column',
          showInLegend: false,
          data: this.dataTransferArray,
        },
      ],
      credits: {
        enabled: false,
      },
    });
  }
}
