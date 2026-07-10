import type { BilingualText } from './types';

export const news: Array<{ date: string; title: BilingualText; route: string }> = [
  { date: '2026-07', title: { en: 'Awarded the General Program of the 79th Batch of China Postdoctoral Science Foundation.', zh: '获中国博士后科学基金第79批面上资助。' }, route: '/projects/' },
  { date: '2026-06', title: { en: 'Awarded the Yunnan Caiyun Postdoctoral Program Innovation Project.', zh: '获云南省“彩云博士后计划”创新项目资助。' }, route: '/projects/' },
  { date: '2025-10', title: { en: 'Received a bronze award in the Yunnan selection of the 2025 China International College Students’ Innovation Competition.', zh: '获中国国际大学生创新大赛（2025）云南赛区选拔赛铜奖。' }, route: '/awards/' },
  { date: '2025-07', title: { en: 'Joined the Kunming Institute of Zoology as an Assistant Research Fellow.', zh: '入职中国科学院昆明动物研究所，任助理研究员。' }, route: '/cv/' },
  { date: '2025-06', title: { en: 'Received a Ph.D. in Information and Communication Engineering from Yunnan University.', zh: '获云南大学信息与通信工程博士学位。' }, route: '/cv/' },
  { date: '2025', title: { en: 'Published first-author work on lightweight real-time forest fire detection in Expert Systems with Applications.', zh: '以第一作者在 Expert Systems with Applications 发表轻量化实时森林火灾检测研究。' }, route: '/publications/' },
  { date: '2024', title: { en: 'Published first-author research in IEEE Transactions on Geoscience and Remote Sensing.', zh: '以第一作者在 IEEE Transactions on Geoscience and Remote Sensing 发表研究成果。' }, route: '/publications/' },
  { date: '2024', title: { en: 'Received the National Scholarship for Ph.D. students.', zh: '获博士研究生国家奖学金。' }, route: '/awards/' },
];
