import { Observable } from 'rxjs';

export interface Team {
  team: string;
  win: number;
  lose: number;
  salary: number;
  team_fullname: string;
}

export type TeamDetail = [string[], object, object, number[], number[], number[]];

export abstract class TeamData {
  abstract getTeamData(): Observable<Team[]>;
  abstract getTeamNames(): Observable<string[]>;
  abstract getTeamFullNames(): Observable<string[]>;
  abstract getGroupedTeamData(): Observable<TeamDetail>;
}
