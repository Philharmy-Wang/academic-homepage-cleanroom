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
  coFirst?: boolean;
}

export interface PublicationLink {
  label: 'DOI' | 'Publisher' | 'PDF' | 'Code' | 'Dataset' | 'Project';
  url: string;
}

export interface PublicationMetrics {
  casZone: 1 | 2 | 3 | 4 | null;
  casTop: boolean | null;
  casEdition: string | null;
  casSourceUrl: string | null;
  jcrQuartile: 'Q1' | 'Q2' | 'Q3' | 'Q4' | null;
  jif: number | null;
  fiveYearJif: number | null;
  jifYear: number | null;
  jcrEdition: string | null;
  jcrSourceUrl: string | null;
  verifiedAt: string | null;
  verificationStatus: 'verified' | 'partial' | 'needs-author-screenshot' | 'not-applicable';
  ccf: string | null;
}

export interface PublicationFigure {
  src: string;
  preferredSrc?: string;
  width: number;
  height: number;
  alt: BilingualText;
  sourceCategory: 'original-site-illustration';
  sourceNote: string;
}

export interface Publication {
  id: string;
  group: 'First-author Publications' | 'Co-authored Publications' | 'Chinese Publications';
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
  contribution: BilingualText;
  firstAffiliation: string | null;
  doi: string | null;
  publisherUrl: string | null;
  pdfUrl: string | null;
  codeUrl: string | null;
  datasetUrl: string | null;
  projectUrl: string | null;
  scholarUrl: string | null;
  figure: PublicationFigure | null;
  links: PublicationLink[];
  metrics: PublicationMetrics;
  verifiedAt: string;
  sourceNotes: string;
}

export interface Project {
  id: string;
  group: 'current' | 'funded' | 'previous' | 'participated';
  title: BilingualText;
  project: BilingualText;
  organization?: BilingualText;
  period?: string | BilingualText;
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
  category?: BilingualText;
}
