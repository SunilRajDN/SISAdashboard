import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import dataTable from '../../assets/table-data.json';

@Component({
  selector: 'app-event-types',
  templateUrl: './event-types.component.html',
  styleUrls: ['./event-types.component.scss'],
})
export class EventTypesComponent implements OnInit {
  chart: any;
  tableData: any = [];
  eventTypes: any = [];
  instrusionAttemptAllowed: any = 0;
  instrusionAttemptBlocked: any = 0;
  dataBreachAllowed: any = 0;
  dataBreachBlocked: any = 0;
  suspAllowed: any = 0;
  suspBlocked: any = 0;

  constructor() {}

  ngOnInit(): void {
    this.tableData = dataTable.data;

    this.tableData.forEach((result: any) => {
      if (
        result.event_type == 'Intrusion Attempt' &&
        result.action_taken == 'Allowed'
      ) {
        this.instrusionAttemptAllowed = this.instrusionAttemptAllowed + 1;
      } else if (
        result.event_type == 'Intrusion Attempt' &&
        result.action_taken == 'Blocked'
      ) {
        this.instrusionAttemptBlocked = this.instrusionAttemptBlocked + 1;
      } else if (
        result.event_type == 'Data Breach' &&
        result.action_taken == 'Allowed'
      ) {
        this.dataBreachAllowed = this.dataBreachAllowed + 1;
      } else if (
        result.event_type == 'Data Breach' &&
        result.action_taken == 'Blocked'
      ) {
        this.dataBreachBlocked = this.dataBreachBlocked + 1;
      } else if (
        result.event_type == 'Suspicious Activity' &&
        result.action_taken == 'Allowed'
      ) {
        this.suspAllowed = this.suspAllowed + 1;
      } else if (
        result.event_type == 'Suspicious Activity' &&
        result.action_taken == 'Blocked'
      ) {
        this.suspBlocked = this.suspBlocked + 1;
      }
    });

    this.chart = new Chart({
      chart: {
        type: 'pie',
        height: 325,
      },
      title: {
        text: 'Event Types',
      },
      xAxis: {
        categories: [
          'Institution Attempt Allowed',
          'Institution Attempt Blocked',
          'Data Breach Allowed',
          'Data Breach Blocked',
          'Suspesious Attempt Allowed',
          'Suspesious Attempt Blocked',
        ],
      },
      yAxis: {
        title: {
          text: '',
        },
      },
      series: [
        {
          type: 'pie',
          data: [
            {
              name: 'Institution Attempt Allowed',
              y: this.instrusionAttemptAllowed,
              color: '#044342',
            },
            {
              name: 'Institution Attempt Blocked',
              y: this.instrusionAttemptBlocked,
              color: '#880808 ',
            },
            {
              name: 'Data Breach Allowed',
              y: this.dataBreachAllowed,
              color: '#0000FF',
            },
            {
              name: 'Data Breach Blocked',
              y: this.dataBreachBlocked,
              color: '#880808 ',
            },
            {
              name: 'Suspesious Attempt Allowed',
              y: this.suspAllowed,
              color: '#ed9e20',
            },
            {
              name: 'Suspesious Attempt Blocked',
              y: this.suspBlocked,
              color: '#880808 ',
            },
          ],
        },
      ],
      credits: {
        enabled: false,
      },
    });
  }
}
