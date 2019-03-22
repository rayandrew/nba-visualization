
import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { Player, PlayerChartData, PlayerData } from '../data/player';

import * as Players from '../players.json';

@Injectable()
export class PlayerService extends PlayerData {

  private listPlayers: Player[] = (<any> Players).default;

  getPlayerChartData(): Observable<PlayerChartData> {

    const scatterData = this.listPlayers.reduce((acc, { team, player, salary, per }) => {
      if (per >= 0 && per <= 35 && salary >= 0 && salary <= 35000000 && player !== 'Nikola Jokic') {
        if (acc[team]) {
          acc[team].push([per, salary, player]);
        } else {
          acc[team] = [[per, salary, player]];
        }
      }

      return acc;
    }, {});

    return observableOf(scatterData);
  }

  getAllPlayers(): Observable<Player[]> {
    return observableOf(this.listPlayers);
  }
}
