import { Observable } from 'rxjs';

export interface Team {
  team: string;
  win: number;
  lose: number;
  salary: number;
}

export abstract class TeamData {
  abstract getTeamData(): Observable<Team[]>;
  abstract getGroupedTeamData(): Observable<[string[], number[], number[], number[]]>;
}
