import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PlayerChartData } from '../../../@core/data/player';
import { TeamDetail } from '../../../@core/data/team';

import { PlayerService } from '../../../@core/mock/player.service';
import { TeamService } from '../../../@core/mock/team.service';

@Component({
  selector: 'ngx-echarts',
  styleUrls: ['./echarts.component.scss'],
  templateUrl: './echarts.component.html',
})
export class EchartsComponent implements OnInit {
  // teamNames: Observable<string[]>;
  teamDetails: Observable<TeamDetail>;

  playersChartData: Observable<PlayerChartData>;

  constructor(private teamService: TeamService, private playerService: PlayerService) {}

  ngOnInit() {
    // this.teamNames = this.teamService.getTeamNames();
    this.teamDetails = this.teamService.getGroupedTeamData();
    this.playersChartData = this.playerService.getPlayerChartData();
  }
}
