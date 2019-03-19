import { Injectable } from '@angular/core';
import { of as observableOf,  Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team, TeamData } from '../data/team';

import * as TeamDataset from '../team_dataset.json';

@Injectable()
export class TeamService extends TeamData {

  private teamData: Team[] = ((<any> TeamDataset).default)
    .slice()
    .sort((a, b) => a.win - b.win);

  private getTeamNames(): Observable<string[]> {
    return observableOf(this.teamData.map(({ team }) => team));
  }

  private getTeamWin(): Observable<number[]> {
    return observableOf(this.teamData.map(({ win }) => win));
  }

  private getTeamLose(): Observable<number[]> {
    return observableOf(this.teamData.map(({ lose }) => lose));
  }

  private getTeamSalary(): Observable<number[]> {
    return observableOf(this.teamData.map(({ salary }) => salary));
  }

  getTeamData(): Observable<Team[]> {
    return observableOf(this.teamData);
  }

  getGroupedTeamData(): Observable<[string[], number[], number[], number[]]> {
    return forkJoin(
      this.getTeamNames(),
      this.getTeamWin(),
      this.getTeamLose(),
      this.getTeamSalary(),
    );
  }
}
