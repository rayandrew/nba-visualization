import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { TeamDetail } from '../../../@core/data/team';

@Component({
  selector: 'ngx-echarts-bar',
  template: `
    <div echarts
         [options]="options"
         style="height: 1700px"
    >
    </div>
  `,
})
export class EchartsBarComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  teamSubscription: any;

  @Input() teamDetail: TeamDetail;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const [teamNames, teamFullNames, teamPics, teamWins, , teamSalary] = this.teamDetail;

      const echarts: any = config.variables.echarts;

      const standardizeTeamSalary = teamSalary.map(x => x * 90 / 150000000 * -1);

      this.options = {
        backgroundColor: echarts.bg,
        color: '#1344a0',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter: params => {
            const team = params[0].name;
            const win = params[0].data.value;
            const salary = params[1].data * 150000000 / 90 * -1;
            const colorWin = params[0].color;
            const colorSalary = params[1].color;

            const currency = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            });

            const colorSpan =
              bgColor =>
                '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'
                + bgColor
                + '"></span>';
            const rez = '<p style="margin-bottom: 5px">' + team + '</p>' +
              '<span>' + colorSpan(colorWin) + ' WIN : ' + win + '</span><br>' +
              '<span>' + colorSpan(colorSalary) + ' Salary : ' + currency.format(salary) + '</span>';

            return rez;
          },
        },
        legend: {
          data: ['Win', 'Salary'],
          backgroundColor: '#2d3035',
          top: 20,
          textStyle: {
            color: echarts.textColor,
          },
          selectedMode: false,
        },
        grid: {
          top: '4%',
          containLabel: true,
        },
        xAxis: [
          {
            name: 'Win',
            type: 'value',
            boundaryGap: [0, 0.1],
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: echarts.textColor,
              },
              formatter: label => {
                const currency = new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                });

                if (label < 0) {
                  return currency.format(label * 150000000 / 90 * -1).substr(1);
                } else {
                  return label;
                }
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'category',
            data: teamNames,
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              show: false,
              interval: 0,
            },
          },
        ],
        // graphic: [
        //   {
        //     type: 'image',
        //     id: 'logo',
        //     right: 30,
        //     top: 20,
        //     z: -10,
        //     bounding: 'raw',
        //     style: {
        //       image: 'assets/images/nba-two.png',
        //       width: 75,
        //       height: 150,
        //       opacity: 0.4,
        //     },
        //   },
        // ],
        series: [
          {
            name: 'Win',
            type: 'bar',
            stack: 'team',
            z: 2,
            label: {
              normal: {
                show: true,
                position: 'insideRight',
                formatter: (value) => `{value|${teamFullNames[value.name]}} {${value.name}|}`,
                rich: {
                  value: {
                    align: 'center',
                    color: echarts.textColor,
                  },
                  ...teamPics,
                },
              },
            },
            data: teamWins.map(value => ({
              value,
              label: {
                normal: {
                  position: 'left',
                },
              },
            })),
            barCategoryGap: '50%',
            barWidth: 45,
            itemStyle: {
              color: ({ name }) => {
                if (name === 'HOU') {
                  // return '#2b60c6';
                  return '#c12841';
                } else {
                  return '#871b2c';
                  // return '#1b3972';
                }
              },
            },
          },
          {
            name: 'Salary',
            type: 'bar',
            stack: 'team',
            z: 1,
            data: standardizeTeamSalary,
            barCategoryGap: '50%',
            barWidth: 45,
            itemStyle: {
              color: ({ name }) => {
                if (name === 'CLE') {
                  // return '#c12841';
                  return '#2b60c6';
                } else {
                  return '#1b3972';
                  // return '#871b2c';
                }
              },
            },
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
