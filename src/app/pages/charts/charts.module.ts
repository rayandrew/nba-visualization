import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';

import { ChartsRoutingModule, routedComponents } from './charts-routing.module';
import { EchartsBarComponent } from './echarts/echarts-bar.component';
import { EchartsScatterComponent } from './echarts/echarts-scatter.component';
import { EchartsGraphComponent } from './echarts/echarts-graph.component';

const components = [
  EchartsBarComponent,
  EchartsScatterComponent,
  EchartsGraphComponent,
];

@NgModule({
  imports: [ThemeModule, ChartsRoutingModule, NgxEchartsModule],
  declarations: [...routedComponents, ...components],
})
export class ChartsModule { }
