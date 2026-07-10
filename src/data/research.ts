import type { BilingualText } from './types';

export interface ResearchArea {
  id: string;
  title: BilingualText;
  problem: BilingualText;
  method: BilingualText;
  status: BilingualText;
  iconName: 'primate' | 'identity' | 'pose' | 'multiview' | 'edge' | 'wildfire';
  iconImage: string;
  iconAltZh: string;
  iconAltEn: string;
  relatedRoute: '/publications/' | '/projects/' | '/datasets/';
}

export const researchAreas: ResearchArea[] = [
  {
    id: 'primate-perception',
    title: { en: 'Non-human Primate Visual Perception', zh: '非人灵长类视觉感知' },
    problem: { en: 'Build reliable visual representations for long-term observation in complex social and cage environments.', zh: '面向复杂社会关系与笼舍环境，建立可支持长期观察的可靠视觉表征。' },
    method: { en: 'Domain-aware representation learning, robust detection, and multi-modal visual cues.', zh: '关注领域适应表征、稳健检测与多模态视觉线索。' },
    status: { en: 'Ongoing', zh: '持续开展' },
    iconName: 'primate', iconImage: '/images/research/primate-vision.svg', iconAltZh: '非人灵长类视觉感知图标', iconAltEn: 'Non-human primate visual perception icon',
    relatedRoute: '/projects/',
  },
  {
    id: 'identity',
    title: { en: 'Macaque Detection and Individual Identification', zh: '猕猴检测与个体识别' },
    problem: { en: 'Detect group-housed macaques and maintain identity under occlusion, pose change, and appearance similarity.', zh: '在遮挡、姿态变化和外观相似条件下检测群笼猕猴并维持个体身份。' },
    method: { en: 'Identity-aware detection, metric learning, and separability modeling.', zh: '关注身份感知检测、度量学习与个体可分性建模。' },
    status: { en: 'Ongoing', zh: '持续开展' },
    iconName: 'identity', iconImage: '/images/research/macaque-identification.svg', iconAltZh: '猕猴检测与个体识别图标', iconAltEn: 'Macaque detection and identification icon',
    relatedRoute: '/projects/',
  },
  {
    id: 'pose-behavior',
    title: { en: 'Pose Estimation and Behavior Understanding', zh: '姿态估计与行为理解' },
    problem: { en: 'Translate fine-grained body motion into interpretable behavioral evidence.', zh: '将细粒度身体运动转化为可解释的行为证据。' },
    method: { en: 'Keypoint estimation, temporal modeling, and multimodal behavior recognition.', zh: '关注关键点估计、时序建模与多模态行为识别。' },
    status: { en: 'In development', zh: '方法开发中' },
    iconName: 'pose', iconImage: '/images/research/pose-behavior.svg', iconAltZh: '姿态估计与行为理解图标', iconAltEn: 'Pose estimation and behavior understanding icon',
    relatedRoute: '/datasets/',
  },
  {
    id: 'multiview',
    title: { en: 'Multi-view and Long-term Cage Monitoring', zh: '多视角与长期笼舍监测' },
    problem: { en: 'Associate animals consistently across cameras and over extended recording periods.', zh: '在多摄像头与长时间记录中保持个体归属的一致性。' },
    method: { en: 'Cross-view association, long-term tracking, and monitoring pipeline design.', zh: '关注跨视角关联、长时跟踪与监测流程设计。' },
    status: { en: 'Ongoing', zh: '持续开展' },
    iconName: 'multiview', iconImage: '/images/research/multiview-monitoring.svg', iconAltZh: '多视角与长期监测图标', iconAltEn: 'Multi-view and long-term monitoring icon',
    relatedRoute: '/projects/',
  },
  {
    id: 'efficient-detection',
    title: { en: 'Lightweight Object Detection and Edge Deployment', zh: '轻量化目标检测与边缘部署' },
    problem: { en: 'Balance accuracy, latency, and compute cost for real-time visual systems.', zh: '在实时视觉系统中平衡精度、延迟与计算成本。' },
    method: { en: 'Compact architectures, efficient feature fusion, and deployment-oriented evaluation.', zh: '关注紧凑网络、有效特征融合与面向部署的评估。' },
    status: { en: 'Established research line', zh: '已形成研究积累' },
    iconName: 'edge', iconImage: '/images/research/edge-deployment.svg', iconAltZh: '轻量化检测与边缘部署图标', iconAltEn: 'Lightweight detection and edge deployment icon',
    relatedRoute: '/publications/',
  },
  {
    id: 'remote-sensing',
    title: { en: 'Multimodal Remote Sensing and Wildfire Detection', zh: '多模态遥感与森林火灾检测' },
    problem: { en: 'Detect early wildfire signals across remote-sensing modalities and variable environments.', zh: '在多种遥感模态与复杂环境中识别早期森林火灾信号。' },
    method: { en: 'Synthetic data, multi-scale interaction, and infrared-visible fusion.', zh: '关注合成数据、多尺度交互与红外—可见光融合。' },
    status: { en: 'Previous major research line', zh: '前期主要研究方向' },
    iconName: 'wildfire', iconImage: '/images/research/remote-sensing-fire.svg', iconAltZh: '多模态遥感与森林火灾检测图标', iconAltEn: 'Multimodal remote sensing and wildfire detection icon',
    relatedRoute: '/publications/',
  },
];
