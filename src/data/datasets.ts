import type { BilingualText } from './types';

export const datasets: Array<{ id: string; title: BilingualText; status: BilingualText; description: BilingualText }> = [
  { id: 'primate-behavior', title: { en: 'Non-human Primate Behavior Datasets', zh: '非人灵长类行为数据' }, status: { en: 'Under internal review', zh: '内部审核中' }, description: { en: 'Curated resources for behavior understanding; no private storage paths or unreleased links are published.', zh: '面向行为理解的整理资源；不公开私有存储路径或未发布链接。' } },
  { id: 'macaque-identity', title: { en: 'Macaque Detection and Identification Resources', zh: '猕猴检测与个体识别资源' }, status: { en: 'In preparation', zh: '整理中' }, description: { en: 'Detection and identity-oriented annotations are being prepared for a responsible release process.', zh: '检测与身份相关标注正在整理，并将按规范完成发布准备。' } },
  { id: 'pose-code', title: { en: 'Pose and Behavior Analysis Code', zh: '姿态与行为分析代码' }, status: { en: 'Available upon reasonable request', zh: '可按合理学术请求沟通' }, description: { en: 'Research code may be shared where project and collaboration conditions permit.', zh: '在项目与合作条件允许时，可沟通共享相关研究代码。' } },
  { id: 'wildfire', title: { en: 'Remote Sensing Wildfire Resources', zh: '遥感森林火灾研究资源' }, status: { en: 'Available where release conditions permit', zh: '按发布条件提供' }, description: { en: 'Selected research resources can be discussed for academic use subject to release conditions.', zh: '在符合发布条件的前提下，可就部分研究资源的学术使用进行沟通。' } },
];
