import { Observable } from 'rxjs';

export interface Team {
  team: string;
  win: number;
  lose: number;
  salary: number;
}

export type TeamDetail = [string[], object, number[], number[], number[]];

export abstract class TeamData {
  abstract getTeamData(): Observable<Team[]>;
  abstract getTeamNames(): Observable<string[]>;
  abstract getGroupedTeamData(): Observable<TeamDetail>;
}
