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
  @Input() team: string;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const echarts: any = config.variables.echarts;
      const seriesData: any = [{
        symbolSize: 10,
        data: this.playerChartData,
        type: 'scatter',
      }];

      if (this.team === 'DEN') {
        seriesData.push({
          symbolSize: 20,
          data: [
            {
              value: [24.4, 1471382, 'Nikola Jokic'],
              itemStyle: {
                color: '#20b0e5',
              },
            },
          ],
          type: 'scatter',
        });
      }

      if (this.team === 'GSW') {
        seriesData.push({
          symbolSize: 20,
          data: [
            {
              value: [28.2, 34682550, 'Stephen Curry'],
              itemStyle: {
                color: '#20b0e5',
              },
            },
          ],
          type: 'scatter',
        });
      }

      if (this.team === 'HOU') {
        seriesData.push({
          symbolSize: 20,
          data: [
            {
              value: [30.2, 28299399, 'James Harden'],
              itemStyle: {
                color: '#20b0e5',
              },
            },
          ],
          type: 'scatter',
        });
      }

      if (this.team === 'CLE') {
        seriesData.push({
          symbolSize: 20,
          data: [
            {
              value: [28.5, 33285709, 'LeBron James'],
              itemStyle: {
                color: '#20b0e5',
              },
            },
          ],
          type: 'scatter',
        });
      }

      if (this.team === 'BOS') {
        seriesData.push({
          symbolSize: 20,
          data: [
            {
              value: [25.1, 18868625, 'Kyrie Irving'],
              itemStyle: {
                color: '#20b0e5',
              },
            },
          ],
          type: 'scatter',
        });
      }

      if (this.team === 'MIL') {
        seriesData.push({
          symbolSize: 20,
          data: [
            {
              value: [27.7, 22471910, 'Giannis Antetokounmpo'],
              itemStyle: {
                color: '#20b0e5',
              },
            },
          ],
          type: 'scatter',
        });
      }

      if (this.team === 'NOP') {
        seriesData.push({
          symbolSize: 20,
          data: [
            {
              value: [28.9, 23775506, 'Anthony Davis'],
              itemStyle: {
                color: '#20b0e5',
              },
            },
          ],
          type: 'scatter',
        });
      }

      if (this.team === 'OKC') {
        seriesData.push({
          symbolSize: 20,
          data: [
            {
              value: [25, 28530608, 'Russell Westbrook'],
              itemStyle: {
                color: '#20b0e5',
              },
            },
          ],
          type: 'scatter',
        });
      }

      this.options = {
        backgroundColor: echarts.bg,
        color: '#11419b',
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow',
          },
          formatter: ({ data, color }) => {
            const value: any = 'value' in data ? data.value : data;

            const currency = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            });

            const colorSpan =
              bgColor =>
              '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'
              + bgColor
              + '"></span>';
            const rez = '<p style="margin-bottom: 5px">' + value[2] + '</p>' +
              '<span>' + colorSpan(color) + ' PER : ' + value[0] + '</span><br>' +
              '<span>' + colorSpan(color) + ' Salary : ' + currency.format(value[1]) + '</span>';

            return rez;
          },
        },
        xAxis: [
          {
            name: 'PER',
            type: 'value',
            min: 0,
            max: 35,
            nameTextStyle: {
              color: '#ebeff1',
            },
            axisLine: {
              onZero: true,
              lineStyle: {
                color: '#ebeff1',
              },
            },
            splitLine: {
              lineStyle: {
                color: '#ebeff1',
                opacity: 0.3,
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
            min: 0,
            max: 35000000,
            nameTextStyle: {
              color: '#ebeff1',
            },
            axisLine: {
              lineStyle: {
                color: '#ebeff1',
              },
            },
            splitLine: {
              lineStyle: {
                color: '#ebeff1',
                opacity: 0.3,
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
        series: seriesData,
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
