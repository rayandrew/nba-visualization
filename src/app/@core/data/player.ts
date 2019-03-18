
import { Observable } from 'rxjs';

export interface Player {
  per: number;
  player: string;
  salary: number;
  team: string;
}

export interface PlayerChart {
  label: string;
  value: number;
}

export abstract class PlayerData {
  abstract getListData(): Observable<Player[]>;
  abstract getChartData(): Observable<PlayerChart[]>;
}
