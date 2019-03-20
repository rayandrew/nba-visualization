import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'nb-e-commerce',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Charts',
    icon: 'nb-bar-chart',
    link: '/pages/charts/echarts',
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
