import type { BilingualText } from './types';

export const patents: Array<{ id: string; title: BilingualText; number: string; date: string; status: BilingualText; role: BilingualText }> = [
  { id: 'uav-fire-warning', title: { en: 'Fire inspection and warning method based on UAV and improved YOLOv8 object detection', zh: '基于无人机与改进 YOLOv8 目标检测算法的火灾巡检预警方法' }, number: 'ZL 2023 1 1695298.8', date: '2024-03-08', status: { en: 'Granted', zh: '已授权' }, role: { en: 'Inventor', zh: '发明人' } },
  { id: 'uav-edge-detection', title: { en: 'Object detection method, system, and device based on UAV and NVIDIA development board', zh: '基于无人机与英伟达开发板的目标检测方法、系统及装置' }, number: 'ZL 2021 1 1191844.5', date: '2025-11-07', status: { en: 'Granted', zh: '已授权' }, role: { en: 'Inventor', zh: '发明人' } },
];
