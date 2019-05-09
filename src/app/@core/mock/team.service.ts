import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { Team, TeamData, TeamDetail } from '../data/team';

import * as TeamDataset from '../team_dataset.json';

@Injectable()
export class TeamService extends TeamData {

  private teamData: Team[] = ((<any>TeamDataset).default)
    .slice()
    .sort((a, b) => a.win - b.win);

  getTeamNames(): Observable<string[]> {
    return observableOf(this.teamData.map(({ team }) => team));
  }

  getTeamFullNames(): Observable<string[]> {
    return observableOf(this.teamData.map(({ team_fullname }) => team_fullname));
  }

  getTeamData(): Observable<Team[]> {
    return observableOf(this.teamData);
  }

  getGroupedTeamData(): Observable<TeamDetail> {
    return observableOf(this.teamData.reduce((
      [teamNames, teamFullNames, teamPics, teamWins, teamLoses, teamSalaries],
      { team, team_fullname, win, lose, salary },
    ) => {
      teamNames.push(team);
      teamFullNames[team] = team_fullname;

      teamPics[team] = {
        height: 40,
        align: 'center',
        backgroundColor: {
          image: `assets/images/teams/${team}.png`,
        },
      };
      teamWins.push(win);
      teamLoses.push(lose);
      teamSalaries.push(salary);

      return [teamNames, teamFullNames, teamPics, teamWins, teamLoses, teamSalaries];
    }, (<any>[[], {}, {}, [], [], []])));
  }

  getData(): any[] {
    return this.teamData;
  }
}
