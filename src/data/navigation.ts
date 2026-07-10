import type { BilingualText } from './types';

export const navigation: Array<{ route: string; label: BilingualText }> = [
  { route: '/', label: { en: 'Home', zh: '首页' } },
  { route: '/research/', label: { en: 'Research', zh: '研究' } },
  { route: '/publications/', label: { en: 'Publications', zh: '论文' } },
  { route: '/projects/', label: { en: 'Projects', zh: '项目' } },
  { route: '/datasets/', label: { en: 'Resources', zh: '资源' } },
  { route: '/awards/', label: { en: 'Awards', zh: '荣誉' } },
  { route: '/cv/', label: { en: 'CV', zh: '履历' } },
];
