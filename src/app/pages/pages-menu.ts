import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Charts',
    icon: 'nb-chart',
    link: '/pages/charts',
  },
  {
    title: 'Tables',
    icon: 'nb-tables',
    children: [
      {
        title: 'Team',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'Player',
        link: '/pages/tables/smart-table',
      },
    ],
  },
];
