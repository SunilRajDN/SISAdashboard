import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HPie from 'highcharts/modules/variable-pie';
import tableData from '../../assets/table-data.json';

HPie(Highcharts);

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.scss'],
})
export class ProtocolComponent implements OnInit {
  Highcharts = Highcharts;
  chart: any = Highcharts.Chart;
  chartOptions: any;
  dataTable: any = [];
  countTcpAllowed: any = 0;
  countTcpBlocked: any = 0;
  countUdpAllowed: any = 0;
  countUdpBlocked: any = 0;
  constructor() {}

  ngOnInit(): void {
    this.dataTable = tableData.data;
    if (this.dataTable.length) {
      this.dataTable.forEach((element: any) => {
        if (element.protocol == 'TCP' && element.action_taken == 'Allowed') {
          this.countTcpAllowed = this.countTcpAllowed + 1;
        } else if (
          element.protocol == 'TCP' &&
          element.action_taken == 'Blocked'
        ) {
          this.countTcpBlocked = this.countTcpBlocked + 1;
        } else if (
          element.protocol == 'UDP' &&
          element.action_taken == 'Allowed'
        ) {
          this.countUdpAllowed = this.countUdpAllowed + 1;
        } else if (
          element.protocol == 'UDP' &&
          element.action_taken == 'Blocked'
        ) {
          this.countUdpBlocked = this.countUdpBlocked + 1;
        }
      });
    }

    this.chartOptions = {
      chart: {
        type: 'variablepie',
      },
      accessibility: {
        description: 'A variable radius pie chart',
      },
      title: {
        text: 'Protocol',
      },
      tooltip: {
        headerFormat: '',
        pointFormat:
          '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
          'Attempts: <b>{point.y}</b><br/>',
        // 'Population density (people per square km): <b>{point.z}</b><br/>'
      },
      series: [
        {
          minPointSize: 10,
          innerSize: '20%',
          zMin: 0,
          name: 'countries',
          data: [
            {
              name: 'TCP Allowed',
              y: this.countTcpAllowed,
              z: 92.9,
            },
            {
              name: 'TCP Blocked',
              y: this.countTcpBlocked,
              z: 92.9,
            },
            {
              name: 'UDP Allowed',
              y: this.countUdpAllowed,
              z: 118.7,
            },
            {
              name: 'UDP Blocked',
              y: this.countUdpBlocked,
              z: 118.7,
            },
          ],
        },
      ],
    };
  }

  logChartInstance(res: any) {}
}
