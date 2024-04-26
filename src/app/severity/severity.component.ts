import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import tableData from '../../assets/table-data.json';

@Component({
  selector: 'app-severity',
  templateUrl: './severity.component.html',
  styleUrls: ['./severity.component.scss'],
})
export class SeverityComponent implements OnInit {
  chart: any;
  dataTable: any = [];
  dateArray: any = [];
  highArray: any = [];
  mediumArray: any = [];
  lowArray: any = [];

  constructor() {}

  ngOnInit(): void {
    this.dataTable = tableData.data;
    this.dataTable.forEach((element: any) => {
      if (element.date) {
        this.dateArray.push(element.date);

        if (element.severity == 'High') {
          this.highArray.push(element.bytes_transferred);
        } else {
          this.highArray.push(0);
        }
        if (element.severity == 'Medium') {
          this.mediumArray.push(element.bytes_transferred);
        } else {
          this.mediumArray.push(0);
        }
        if (element.severity == 'Low') {
          this.lowArray.push(element.bytes_transferred);
        } else {
          this.lowArray.push(0);
        }
      }
    });

    this.chart = new Chart({
      chart: {
        type: 'line',
        height: 340,
      },
      title: {
        text: 'Severity',
      },
      xAxis: {
        categories: this.dateArray,
      },
      yAxis: {
        title: {
          text: 'Severity',
        },
      },
      series: [
        {
          name: 'High',
          type: 'line',
          color: '#FF0000',
          data: this.highArray,
        },
        {
          name: 'Medium',
          type: 'line',
          color: '#FFC300',
          data: this.mediumArray,
        },
        {
          name: 'Low',
          type: 'line',
          color: '#228B22',
          data: this.lowArray,
        },
      ],
      credits: {
        enabled: false,
      },
    });
  }
}
