import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EChartOption } from 'echarts';
import { parse } from 'echarts/extension/dataTool/gexf';

@Component({
    selector: 'ngx-echarts-graph',
    template: `
    <div echarts [options]="options | async" class="echart" style="height: 1700px"></div>
  `,
})
export class EchartsGraphComponent implements AfterViewInit, OnDestroy {
    options: Observable<EChartOption>;
    themeSubscription: any;

    constructor(private theme: NbThemeService, private http: HttpClient) {
    }

    ngAfterViewInit() {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

            // const colors: any = config.variables;
            // const echarts: any = config.variables.echarts;

            this.options = this.http.get('assets/data/playersToTeamOri.gexf', { responseType: 'text' }).pipe(
                map(xml => {
                    const graph = parse(xml);
                    const categories = [];
                    categories[0] = {
                        name: 'Player',
                        itemStyle: {
                            color: '#000da3',
                        },
                    };
                    categories[1] = {
                        name: 'Team',
                        itemStyle: {
                            color: '#d80000',
                        },
                    };
                    graph.nodes.forEach(function (node) {
                        if (node.attributes[1] != null) {
                            node.symbolSize = node.attributes[2] / 1000000;
                        } else if (node.attributes[3] != null) {
                            node.symbolSize = node.attributes[2] / 1500000;
                        } else {
                            node.symbolSize = node.attributes[2] / 15000000;
                        }
                        node.name = node.attributes[0];

                        if (node.name === 'James Harden' || node.name === 'LeBron James' ||
                            node.name === 'Stephen Curry' || node.name === 'Giannis Antetokounmpo' ||
                            node.name === 'Anthony Davis' || node.name === 'Russell Westbrook' ||
                            node.name === 'Kevin Durant' || node.name === 'Kyrie Irving' ||
                            node.name === 'Nikola Jokic' || node.name === 'Kawhi Leonard') {
                            node.category = 0;
                            node.itemStyle = {
                                normal: {
                                    color: '#00b6ff',
                                },
                            };
                        } else if (node.name === 'ATL' || node.name === 'BRK' || node.name === 'BOS' ||
                            node.name === 'CHO' || node.name === 'CHI' || node.name === 'CLE' ||
                            node.name === 'DAL' || node.name === 'DEN' || node.name === 'DET' ||
                            node.name === 'GSW' || node.name === 'LAL' || node.name === 'MEM' ||
                            node.name === 'MIA' || node.name === 'MIL' || node.name === 'MIN' ||
                            node.name === 'NOP' || node.name === 'NYK' || node.name === 'OKC' ||
                            node.name === 'ORL' || node.name === 'PHI' || node.name === 'PHO' ||
                            node.name === 'POR' || node.name === 'SAS' || node.name === 'SAC' ||
                            node.name === 'TOR' || node.name === 'UTA' || node.name === 'WAS' ||
                            node.name === 'HOU' || node.name === 'IND' || node.name === 'LAC') {
                            node.category = 1;
                            node.symbol = `image://assets/images/teams/${node.name}.png`;
                        } else if (node.name === 'NBA') {
                            node.itemStyle = {
                                normal: {
                                    color: '#a50000',
                                },
                            };
                            node.focusNodeAdjacency = true;
                            node.symbol = `image://assets/images/nba-three.png`;
                        } else {
                            node.category = 0;
                        }

                        node.draggable = true;
                        // node.symbolSize /= 1.5;
                        // node.label = {
                        //     normal: {
                        //         show: node.symbolSize > 30
                        //     }
                        // };
                        // node.category = node.attributes[4];
                    });
                    return {
                        tooltip: {
                            formatter: params => {
                                if (params.dataType === 'node') {
                                    const data = params.data.attributes;
                                    const salary = data[2];
                                    const name = params.name;
                                    let perfomance;
                                    let res;

                                    const currency = new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    });

                                    if (data[1] != null) {
                                        perfomance = data[1];
                                        res = '<span style="margin-bottom: 5px">' + name + '</span><br>' +
                                            '<span>' + params.marker + ' PER : ' + perfomance + '</span><br>' +
                                            '<span>' + params.marker + ' Salary : ' + currency.format(salary) + '</span>';
                                    } else if (data[3] != null) {
                                        perfomance = data[3];
                                        res = '<span style="margin-bottom: 5px">' + name + '</span><br>' +
                                            '<span>' + params.marker + ' Win : ' + perfomance + '</span><br>' +
                                            '<span>' + params.marker + ' Salary : ' + currency.format(salary) + '</span>';
                                    } else {
                                        res = '<div class=\'row\' style=\'margin: 5px\'>' +
                                            '<div class=\'column\'><img src=\'assets/images/nba-two.png\' alt=\'Image not found\' height=\'72\' width=\'42\'></div>' +
                                            '<div class=\'column\' style=\'margin: 5px\'>' + '<span style="margin-bottom: 5px">' + name + '</span><br>' +
                                            '<span>' + params.marker + ' Total spent money : ' + currency.format(salary) + '</span></div></div>';
                                    }

                                    return res;
                                }
                            },
                        },
                        legend: [{
                            data: categories.map(function (a) {
                                return a.name;
                            }),
                            textStyle: {
                                color: '#ffffff',
                            },
                        }],
                        animationDuration: 1500,
                        animationEasingUpdate: 'quinticInOut',
                        series: [
                            {
                                name: 'NBA',
                                type: 'graph',
                                layout: 'force',
                                data: graph.nodes,
                                links: graph.links,
                                categories: categories,
                                roam: true,
                                itemStyle: {
                                    normal: {
                                        borderColor: '#fff',
                                        borderWidth: 1,
                                        shadowBlur: 10,
                                        shadowColor: 'rgba(0, 0, 0, 0.3)',
                                    },
                                },
                                label: {
                                    position: 'right',
                                    formatter: '{b}',
                                    color: '#ffffff',
                                },
                                lineStyle: {
                                    curveness: 0.3,
                                },
                                force: {
                                    repulsion: 300,
                                },
                            },
                        ],
                    };
                }),
            );
        });
    }

    ngOnDestroy(): void {
        this.themeSubscription.unsubscribe();
    }
}
