
import { Observable } from 'rxjs';

export interface Player {
  per: number;
  player: string;
  salary: number;
  team: string;
}

export interface PlayerChartRequiredData {
  per: number;
  salary: number;
  player: string;
}

export interface PlayerChartData {
  [key: string]: Array<Array<PlayerChartRequiredData>>;
}

export abstract class PlayerData {
  abstract getPlayerChartData(): Observable<PlayerChartData>;
  abstract getAllPlayers(): Observable<Player[]>;
  abstract getData(): any[];
}
