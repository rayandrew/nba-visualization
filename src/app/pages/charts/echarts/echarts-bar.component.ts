import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { TeamService } from '../../../@core/mock/team.service';

@Component({
  selector: 'ngx-echarts-bar',
  template: `
    <div echarts
         [options]="options"
         class="echart">
    </div>
  `,
})
export class EchartsBarComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  teamSubscription: any;

  constructor(private theme: NbThemeService, private teamService: TeamService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.teamSubscription = this.teamService
        .getGroupedTeamData()
        .subscribe(([teamNames, teamWins, teamLoses, teamSalaries]) => {

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
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
            },
            xAxis: [
              {
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
                barWidth: '60%',
                data: teamWins,
              },
            ],
          };
      });
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
