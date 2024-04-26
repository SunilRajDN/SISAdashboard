import { Component, OnInit, ViewChild } from '@angular/core';
import Highcharts from 'highcharts/highmaps';
import worldMap from '@highcharts/map-collection/custom/world.geo.json';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.scss'],
})
export class MapComponentComponent implements OnInit {
  @ViewChild('globalChart') globalChart: any;
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = 'mapChart';
  mapData: any;
  chartInstance: Highcharts.Chart | any;
  chartOptions!: Highcharts.Options;
  point: any;

  constructor(private http: HttpClient) {}

  getChartInstance(e: Highcharts.Chart) {
    this.chartInstance = e;
    this.chartInstance.reflow();
  }
  ngOnInit() {
    this.chartOptions = {
      chart: {
        borderWidth: 1,
        map: worldMap,
      },

      title: {
        text: 'Data transfered accross countries',
      },

      subtitle: {
        text: 'Demo of Highcharts map with bubbles',
      },

      legend: {
        enabled: false,
      },

      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom',
        },
      },
      plotOptions: {
        series: {
          stickyTracking: false,
          events: {
            click: function (evt) {},
          },
        },
      },
      series: [
        {
          type: 'map',
          name: 'Countries',
          color: '#E0E0E0',
          enableMouseTracking: false,
        },
        {
          type: 'mapbubble',
          name: 'Data transfered, Data Blocked',
          joinBy: ['iso-a3', 'code3'],
          data: this.bubbleData,
          minSize: 20,
          maxSize: 50,
          tooltip: {
            pointFormat: ' {point.z} thousands' + ',' + '{point.y} thousands',
          },
          dataLabels: {
            enabled: true,
            formatter: function (event) {
              return (
                `${this.point.options['z']} ` +
                `,` +
                `${this.point.options['y']}`
              );
            },
          },
          events: {
            // click: (event) => {
            //   this.getNewMapData();
            // },
          },
        },
      ],
    };
  }

  bubbleData = [
    { code3: 'USA', z: 5, y: 6 },
    { code3: 'CHN', z: 10, y: 9 },
    { code3: 'RUS', z: 2, y: 8 },
    { code3: 'FRA', z: 3, y: 6 },
    { code3: 'DEU', z: 15, y: 5 },
  ];

  statesData = [
    { code3: 'us-ar', z: 152 },
    { code3: 'us-mz', z: 302 },
    { code3: 'us-ap', z: 132 },
  ];

  getNewMapData() {
    this.http
      .get('https://code.highcharts.com/mapdata/countries/in/in-all.geo.json')
      .subscribe((response) => {
        this.mapData = response;
        this.deleteAndAddSeries();
      });
  }

  deleteAndAddSeries() {
    while (this.chartInstance.series.length) {
      this.chartInstance.series[0].remove(false);
    }

    let newseries = [
      {
        type: 'map',
        name: 'Countries',
        color: '#E0E0E0',
        enableMouseTracking: false,
      },
      {
        type: 'mapbubble',
        name: 'Population 2016',
        joinBy: ['hc-key', 'code3'],
        data: this.statesData,
        minSize: 4,
        maxSize: 20,
        tooltip: {
          pointFormat: '{point.z} thousands',
        },
        dataLabels: {
          enabled: true,
          formatter: (event: any) => {
            return `${this.point.options['z']}`;
          },
        },
        events: {
          click: (event: any) => {
            this.getNewMapData();
          },
        },
      },
    ];
    this.chartInstance.update({
      chart: { map: this.mapData },
    });

    newseries.map((seriesInstance) => {
      if (seriesInstance) {
        this.chartInstance.addSeries(seriesInstance);
      }
    });
  }
}
