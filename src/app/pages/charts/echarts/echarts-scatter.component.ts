import { AfterViewInit, Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import * as playersJSONFile from '../../../@core/players.json';

const playersJSON = playersJSONFile['default'];

interface PlayerScatterChart {
  per: number;
  salary: number;
  player: string;
}

@Component({
  selector: 'ngx-echarts-scatter',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})

export class EchartsScatterComponent implements AfterViewInit, OnDestroy {
  options: any = {};
	themeSubscription: any;
	teams: Array<string> = this.convertPlayerToEachTeam().teams;

	@Input()
	team: string;

  constructor(private theme: NbThemeService) {
  }

  convertPlayerToEachTeam() {
		const scatterData = new Map<string, Array<Array<PlayerScatterChart>>>();
		let team: string;
		let tempPlayer: Array<PlayerScatterChart>;
		let tempArrayPlayer: Array<Array<PlayerScatterChart>>;
		const teams: Array<string> = [];
		playersJSON.forEach(player => {
			team = player.team;
			if (scatterData.has(team)) {
				tempArrayPlayer = scatterData.get(team);
				tempPlayer = [player.per, player.salary, player.player];
				tempArrayPlayer.push(tempPlayer);
				scatterData.set(team, tempArrayPlayer);
			} else {
				teams.push(player.team);
				tempPlayer = [player.per, player.salary, player.player];
				scatterData.set(team, [tempPlayer]);
			}
		});
		return {'scatterData': scatterData, 'teams': teams};
	}

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

			const players = this.convertPlayerToEachTeam().scatterData;

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
					formatter: function(params) {
						const colorSpan = color => '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + color + '"></span>';
						const rez = '<p>' + params.data[2] + '</p>' +
							'<span>' + colorSpan(params.color) + ' PER : ' + params.data[0] + '</span><br>' +
							'<span>' + colorSpan(params.color) + ' Salary : ' + params.data[1] + '</span>';

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
					data: players.get(this.team),
					type: 'scatter',
        }],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
