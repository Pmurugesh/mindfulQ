import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';

interface SearchResult {
  mainSnippet: string;
  extraSnippets: string;
  source: string;
  url: string;
}

interface ApiResponse {
  summary: string;
  snippets: SearchResult[];
}

const Home = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [summary, setSummary] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.post<ApiResponse>('/api/search', { query });
      setSummary(response.data.summary);
      setResults(response.data.snippets);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>MindfulQ</h1>
      <div className={styles.searchContainer}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Enter your search query" 
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>Search</button>
      </div>
      <div className={styles.resultsContainer}>
        {summary && (
          <div className={styles.summary}>
            <h2>Summary:</h2>
            <p>{summary}</p>
          </div>
        )}
        {results.map((result, index) => (
          <div key={index} className={styles.resultItem}>
            <h3>Main Snippet: {result.mainSnippet}</h3>
            <p>
              Extra Snippet: 
              <a href={result.url} target="_blank" rel="noopener noreferrer">
                {result.extraSnippets}
              </a>
            </p>
            <p>Source: {result.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
