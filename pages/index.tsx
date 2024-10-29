import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';
import { SearchResult, ApiResponse } from '../types/search';
import Head from 'next/head';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hoveredResult, setHoveredResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/search', { query });
      console.log('Search response:', response.data);
      setResults(response.data.results);
    } catch (error) {
      console.error('Error details:', error);
      setError('Failed to fetch search results. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>MindfulQ - Smart Search</title>
        <meta name="theme-color" content="#1a202c" />
        <meta name="color-scheme" content="dark" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>MindfulQ</h1>
        <div className={`${styles.searchContainer} ${isLoading ? styles.loading : ''}`}>
          <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Search anything..." 
            className={styles.searchInput}
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isLoading && query.trim()) {
                handleSearch();
              }
            }}
          />
          <MagnifyingGlassIcon 
            className={styles.searchIcon}
            onClick={() => !isLoading && query.trim() && handleSearch()}
          />
        </div>
        
        {error && <div className={styles.error}>{error}</div>}
        
        <div className={styles.resultsContainer}>
          {isLoading ? (
            <div className={styles.loading}>Loading results...</div>
          ) : (
            results.map((result, index) => (
              <div 
                key={index} 
                className={styles.resultItem}
                onMouseEnter={() => setHoveredResult(index)}
                onMouseLeave={() => setHoveredResult(null)}
              >
                <h3>{result.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: result.snippet }} />
                <a href={result.url} target="_blank" rel="noopener noreferrer">
                  {result.url}
                </a>
                {hoveredResult === index && result.rankedSnippets && (
                  <div className={styles.relatedSnippets}>
                    <h4>Related Snippets:</h4>
                    <ul className={styles.snippetList}>
                      {result.rankedSnippets
                        .sort((a, b) => b.relevance_score - a.relevance_score)
                        .slice(0, 3)
                        .map((snippet, i) => (
                          <li 
                            key={i} 
                            className={styles.snippetItem}
                            dangerouslySetInnerHTML={{ __html: snippet.text }}
                          />
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
