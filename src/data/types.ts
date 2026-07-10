export type Language = 'en' | 'zh';

export interface BilingualText {
  en: string;
  zh: string;
}

export interface Author {
  name: string;
  nameZh?: string;
  self?: boolean;
  corresponding?: boolean;
}

export interface PublicationLink {
  label: 'DOI' | 'Publisher' | 'PDF' | 'Code' | 'Dataset' | 'Project';
  url: string;
}

export interface PublicationMetric {
  label: string;
  value: string;
}

export interface Publication {
  id: string;
  group: 'First-author Publications' | 'Co-authored Publications' | 'Chinese Publications' | 'Other Publications';
  selected: boolean;
  title: string;
  titleZh: string | null;
  authors: Author[];
  venue: string;
  year: number;
  volume: string | null;
  issue: string | null;
  pages: string | null;
  articleNumber: string | null;
  role: BilingualText;
  contribution: BilingualText;
  firstAffiliation: string | null;
  links: PublicationLink[];
  metrics: PublicationMetric[];
  citations: number | null;
  verifiedAt: string;
  sourceNotes: string;
}

export interface Project {
  id: string;
  group: 'current' | 'funded' | 'previous' | 'participated';
  title: BilingualText;
  project: BilingualText;
  organization?: BilingualText;
  period?: string;
  status?: BilingualText;
  role: BilingualText;
}

export interface Award {
  id: string;
  group: 'grants' | 'academic' | 'competitions' | 'other';
  year: string;
  title: BilingualText;
  role?: BilingualText;
  project?: BilingualText;
  level?: BilingualText;
}
