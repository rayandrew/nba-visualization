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
    <div echarts [options]="options | async" class="echart"></div>
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
                    for (let i = 0; i < 9; i++) {
                        categories[i] = {
                            name: 'category' + i
                        };
                    }
                    graph.nodes.forEach(function (node) {
                        if (node.attributes[1] != null) {
                            node.symbolSize = node.attributes[2] / 5000000;
                        } else if (node.attributes[3] != null) {
                            node.symbolSize = node.attributes[2] / 10000000;
                        } else {
                            node.symbolSize = node.attributes[2] / 150000000;
                        }
                        node.name = node.attributes[0];

                        if (node.name === 'James Harden' || node.name === 'Lebron James' ||
                            node.name === 'Stephen Curry' || node.name === 'Giannis Antetokounmpo' ||
                            node.name === 'Anthony Davis' || node.name === 'Russell Westbrook' ||
                            node.name === 'Kevin Durant' || node.name === 'Kyrie Irving' ||
                            node.name === 'Nikola Jokic' || node.name === 'Kawhi Leonard') {
                            node.itemStyle = {
                                normal: {
                                    color: '#00a5ff'
                                }
                            }
                        } else {
                            node.itemStyle = null
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
                        title: {
                            text: 'NBA Vizualization',
                            subtext: 'Default layout',
                            top: 'bottom',
                            left: 'right'
                        },
                        tooltip: {
                            // formatter: params => {
                            //     if (params.dataType === 'node') {
                            //         let data = params.data.attributes
                            //         let salary = data[2];
                            //         let name = params.name;
                            //         let perfomance;
                            //         let res;

                            //         let currency = new Intl.NumberFormat('en-US', {
                            //             style: 'currency',
                            //             currency: 'USD',
                            //         });

                            //         if (data[1] != null) {
                            //             perfomance = data[1];
                            //             res = '<span style="margin-bottom: 5px">' + name + '</span><br>' +
                            //             '<span>' + params.marker + ' PER : ' + perfomance + '</span><br>' +
                            //             '<span>' + params.marker + ' Salary : ' + currency.format(salary) + '</span>';                          
                            //         } else {
                            //             perfomance = data[3];
                            //             res = '<p style="margin-bottom: 5px">' + name + '</p>' +
                            //             '<span>' + params.marker + ' Win : ' + perfomance + '</span><br>' +
                            //             '<span>' + params.marker + ' Salary : ' + currency.format(salary) + '</span>'; 
                            //         }

                            //         return res
                            //     }
                            // }
                        },
                        // legend: [{
                        //     // selectedMode: 'single',
                        //     data: categories.map(function (a) {
                        //         // console.log(a)
                        //         return a.name;
                        //     })
                        // }],
                        animationDuration: 1500,
                        animationEasingUpdate: 'quinticInOut',
                        series: [
                            {
                                name: 'NBA',
                                type: 'graph',
                                layout: 'force',
                                data: graph.nodes,
                                links: graph.links,
                                // categories: categories,
                                roam: true,
                                itemStyle: {
                                    normal: {
                                        borderColor: '#fff',
                                        borderWidth: 1,
                                        shadowBlur: 10,
                                        shadowColor: 'rgba(0, 0, 0, 0.3)'
                                    }
                                },
                                lineStyle: {
                                    curveness: 0.3
                                },
                                force: {
                                    repulsion: 25
                                }
                            }
                        ]
                    };
                })
            );
        });
    }

    ngOnDestroy(): void {
        this.themeSubscription.unsubscribe();
    }
}
