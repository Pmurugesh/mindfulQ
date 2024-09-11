import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

interface ApiResponse {
  results: SearchResult[];
}

const Home = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post<ApiResponse>('/api/search', { query });
      setResults(response.data.results);
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
        {results.map((result, index) => (
          <div key={index} className={styles.resultItem}>
            <h3>{result.title}</h3>
            <p>{result.snippet}</p>
            <a href={result.url} target="_blank" rel="noopener noreferrer">
              {result.url}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

