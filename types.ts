export interface WikiPageViewItem {
  project: string;
  article: string;
  granularity: string;
  timestamp: string;
  access: string;
  agent: string;
  views: number;
}

export interface WikiApiResponse {
  items: WikiPageViewItem[];
}

export interface ProcessedStats {
  totalViews: number;
  articleTitle: string;
  history: {
    date: string; // Formatted date string for display
    fullDate: string; // ISO-like string for sorting if needed
    views: number;
  }[];
}