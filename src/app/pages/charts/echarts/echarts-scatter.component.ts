import { AfterViewInit, Component, OnDestroy, Input } from '@angular/core';

import { NbThemeService } from '@nebular/theme';

import { PlayerChartRequiredData } from '../../../@core/data/player';

@Component({
  selector: 'ngx-echarts-scatter',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})

export class EchartsScatterComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  @Input() playerChartData: PlayerChartRequiredData[];

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.primaryLight],
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow',
        },
          formatter: function({ data, color }) {
            const colorSpan =
              bgColor =>
              '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'
              + bgColor
              + '"></span>';
            const rez = '<p>' + data[2] + '</p>' +
              '<span>' + colorSpan(color) + ' PER : ' + data[0] + '</span><br>' +
              '<span>' + colorSpan(color) + ' Salary : ' + data[1] + '</span>';

            return rez;
          },
        },
        xAxis: [
          {
            name: 'PER',
            type: 'value',
            axisLine: {
              onZero: true,
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              fontSize: 8,
              fontWeight: 'bold',
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            name: 'Salary',
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              fontSize: 8,
              fontWeight: 'bold',
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        grid: {
          top: '15%',
          right: '15%',
          bottom: 0,
          containLabel: true,
        },
        series: [{
          symbolSize: 10,
          data: this.playerChartData,
          type: 'scatter',
        }],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
