export enum Sentiment {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
  NEUTRAL = 'NEUTRAL',
  WARNING = 'WARNING'
}

export interface AnalysisPoint {
  id: string;
  title: string;
  reformDescription: string; // The proposed change
  currentLawDescription: string; // The current state (for contrast)
  impact: Sentiment;
  articleReference?: string;
  workerImpact?: string; // Impacto negativo específico para el trabajador
}

export interface DocumentSection {
  id: string;
  title: string;
  content: string;
  pageReference?: number;
}

export interface DocumentChapter {
  id: string;
  title: string;
  sections: DocumentSection[];
}

export interface Infographic {
  id: string;
  title: string;
  src: string; // Placeholder or url
  description: string;
}