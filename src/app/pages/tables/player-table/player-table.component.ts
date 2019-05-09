import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { PlayerData } from '../../../@core/data/player';

@Component({
  selector: 'ngx-player-table',
  templateUrl: './player-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class PlayerTableComponent {

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      per: {
        title: 'PER',
        type: 'number',
      },
      player: {
        title: 'Player',
        type: 'string',
      },
      salary: {
        title: 'Salary',
        type: 'number',
      },
      team: {
        title: 'Team',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: PlayerData) {
    const data = this.service.getData();
    this.source.load(data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
