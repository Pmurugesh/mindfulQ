// Types for the Brave API response
export interface BraveSearchResult {
  title: string;
  url: string;
  description: string;
  extra_snippets?: string[];
  family_friendly?: boolean;
}

// Types for your processed results
export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  rankedSnippets: {
    text: string;
    relevance_score: number;
  }[];
}

export interface ApiResponse {
  results: SearchResult[];
}

export interface BraveResults {
  web?: {
    results: BraveSearchResult[];
  };
  mixed?: {
    main: BraveSearchResult[];
    top: BraveSearchResult[];
    side: BraveSearchResult[];
  };
} 