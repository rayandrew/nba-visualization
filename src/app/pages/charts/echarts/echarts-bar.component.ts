import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { TeamDetail } from '../../../@core/data/team';

@Component({
  selector: 'ngx-echarts-bar',
  template: `
    <div echarts
         [options]="options"
         style="height: 1500px"
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
      const [teamNames, teamPics, teamWins] = this.teamDetail;

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.primaryLight],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: ['Win', 'Salary'],
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
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: echarts.textColor,
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
              interval: 0,
              formatter: function (value) {
                return '{' + value + '| }\n{value|' + value + '}';
              },
              rich: {
                value: {
                  // lineHeight:,
                  align: 'center',
                },
                ...teamPics,
              },
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: 'Win',
            type: 'bar',
            stack: 'team',
            data: teamWins,
            barCategoryGap: '50%',
            barWidth: 25,
            // barCategoryGap: '50%',
            // barGap: '100%'
          },
          {
            name: 'Salary',
            type: 'bar',
            stack: 'team',
            data: [-15, -16, -27],
            barCategoryGap: '50%',
            barWidth: 25,
            itemStyle: {
              color: '#ffa530',
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
