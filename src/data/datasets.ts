import type { BilingualText } from './types';
import type { IconName } from '../components/Icon.astro';

export interface ResearchResource {
  id: string;
  iconName: IconName;
  title: BilingualText;
  status: BilingualText;
  description: BilingualText;
  sharing: BilingualText;
}

export const datasets: ResearchResource[] = [
  {
    id: 'primate-behavior', iconName: 'primate',
    title: { en: 'Non-human Primate Behavior Datasets', zh: '非人灵长类行为数据' },
    status: { en: 'Internal curation in progress', zh: '内部整理中' },
    description: { en: 'Curated resources for fine-grained behavior understanding and longitudinal observation.', zh: '面向细粒度行为理解与长期观察的数据整理资源。' },
    sharing: { en: 'Academic discussion welcome', zh: '可学术交流' },
  },
  {
    id: 'macaque-identity', iconName: 'identity',
    title: { en: 'Macaque Detection and Identification Resources', zh: '猕猴检测与个体识别资源' },
    status: { en: 'Available through collaboration', zh: '合作可申请' },
    description: { en: 'Detection and identity annotations prepared for responsible research collaboration.', zh: '面向规范科研合作整理的检测与个体身份标注资源。' },
    sharing: { en: 'Contact for collaboration', zh: '合作可申请' },
  },
  {
    id: 'pose-code', iconName: 'pose',
    title: { en: 'Pose and Behavior Analysis Code', zh: '姿态与行为分析代码' },
    status: { en: 'Academic discussion welcome', zh: '可学术交流' },
    description: { en: 'Research code supporting pose estimation and behavior-analysis workflows.', zh: '支持姿态估计与行为分析流程的研究代码。' },
    sharing: { en: 'Contact for academic use', zh: '可学术交流' },
  },
  {
    id: 'wildfire', iconName: 'wildfire',
    title: { en: 'Remote Sensing Wildfire Research Resources', zh: '遥感森林火灾研究资源' },
    status: { en: 'Subject to release conditions', zh: '按发布条件提供' },
    description: { en: 'Selected remote-sensing wildfire resources for eligible academic use.', zh: '在符合发布条件时用于学术研究的遥感森林火灾资源。' },
    sharing: { en: 'Contact to discuss conditions', zh: '按发布条件提供' },
  },
];
