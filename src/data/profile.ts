import type { BilingualText } from './types';

export const profile = {
  name: { en: 'Guanbo Wang', zh: 'Guanbo Wang' },
  position: { en: 'Assistant Research Fellow', zh: '助理研究员' },
  affiliation: {
    en: 'Kunming Institute of Zoology, Chinese Academy of Sciences',
    zh: '中国科学院昆明动物研究所',
  },
  positioning: {
    en: 'Computer Vision for Non-human Primate Behavior Understanding',
    zh: '面向非人灵长类行为理解的计算机视觉研究',
  },
  email: 'wgb1018@gmail.com',
  github: 'https://github.com/Philharmy-Wang',
  scholar: 'https://scholar.google.com/citations?user=Np7b_CQAAAAJ&hl=en',
  bio: {
    en: [
      'Guanbo Wang is an Assistant Research Fellow at the Kunming Institute of Zoology, Chinese Academy of Sciences. He received his Ph.D. in Information and Communication Engineering from Yunnan University.',
      'His current research develops computer vision methods for non-human primate perception and behavior understanding, including macaque detection, individual identification, pose estimation, cross-view identity association, and long-term multi-camera monitoring. His earlier work addressed lightweight object detection, multimodal remote sensing, forest wildfire detection, and edge deployment.',
    ],
    zh: [
      'Guanbo Wang，博士，中国科学院昆明动物研究所助理研究员，毕业于云南大学信息与通信工程专业。',
      '当前主要开展面向非人灵长类视觉感知与行为理解的计算机视觉研究，关注群笼猕猴检测、个体识别、关键点检测、跨视角身份关联与长期多摄像头监测。此前的研究涵盖轻量化目标检测、多模态遥感、森林火灾检测与边缘端部署。',
    ],
  },
  education: [
    { period: '2022.09–2025.06', institution: { en: 'Yunnan University', zh: '云南大学' }, degree: { en: 'Ph.D. in Information and Communication Engineering', zh: '信息与通信工程，博士' } },
    { period: '2019.08–2022.07', institution: { en: 'Yunnan University', zh: '云南大学' }, degree: { en: 'M.S. in Communication and Information Systems', zh: '通信与信息系统，硕士' } },
    { period: '2013.09–2017.07', institution: { en: 'Xuchang University', zh: '许昌学院' }, degree: { en: 'B.S. in Communication Engineering', zh: '通信工程，学士' } },
  ],
  employment: [
    { period: { en: '2025.07–Present', zh: '2025.07–至今' }, title: { en: 'Assistant Research Fellow', zh: '助理研究员' }, organization: { en: 'Kunming Institute of Zoology, Chinese Academy of Sciences', zh: '中国科学院昆明动物研究所' } },
  ],
} satisfies {
  name: BilingualText;
  position: BilingualText;
  affiliation: BilingualText;
  positioning: BilingualText;
  email: string;
  github: string;
  scholar: string;
  bio: { en: string[]; zh: string[] };
  education: Array<{ period: string; institution: BilingualText; degree: BilingualText }>;
  employment: Array<{ period: BilingualText; title: BilingualText; organization: BilingualText }>;
};
