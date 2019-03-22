import { Injectable } from '@angular/core';
import { of as observableOf,  Observable, forkJoin } from 'rxjs';
import { Team, TeamData, TeamDetail } from '../data/team';

import * as TeamDataset from '../team_dataset.json';

@Injectable()
export class TeamService extends TeamData {

  private teamData: Team[] = ((<any> TeamDataset).default)
    .slice()
    .sort((a, b) => a.win - b.win);

  private getTeamWin(): Observable<number[]> {
    return observableOf(this.teamData.map(({ win }) => win));
  }

  private getTeamLose(): Observable<number[]> {
    return observableOf(this.teamData.map(({ lose }) => lose));
  }

  private getTeamSalary(): Observable<number[]> {
    return observableOf(this.teamData.map(({ salary }) => salary));
  }

  private getTeamPicture(): Observable<object> {
    return observableOf(this.teamData.reduce((acc, { team }) => {
      acc[team] = {
        height: 30,
        align: 'center',
        backgroundColor: {
          image: `assets/images/teams/${team}.gif`,
        },
      };

      return acc;
    }, {}));
  }

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
    return forkJoin(
      this.getTeamNames(),
      this.getTeamPicture(),
      this.getTeamWin(),
      this.getTeamLose(),
      this.getTeamSalary(),
    );
  }
}
