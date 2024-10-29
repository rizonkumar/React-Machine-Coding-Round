import { useEffect, useRef, useState } from "react";
import "./Typehead.css";

import {
  FaSearch,
  FaSpinner,
  FaExclamationCircle,
  FaTimes,
} from "react-icons/fa";

const STATE = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

const MAX_CACHE_SIZE = 10;

const TypeHead = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [status, setStatus] = useState(STATE.LOADING);
  const [isInputFocused, setIsInputFocused] = useState(false);

  console.log("Result", result);

  const cache = useRef({});
  const inputRef = useRef(null);

  useEffect(() => {
    // abort for e.g. user typed hell and stopped typing and then typed complete sentence hello again in that case we want to abort the request for hell
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchData = async () => {
      // if the query is empty, reset the result and return
      if (!query.trim()) {
        setResult([]);
        setStatus(STATE.SUCCESS);
        return;
      }

      try {
        setStatus(STATE.LOADING);
        // Check if we have this query in cache
        if (cache.current[query]) {
          setResult(cache.current[query]);
          setStatus(STATE.SUCCESS);
          return;
        }

        // if not in the cache, then make a request to the server
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${query}&limit=10`,
          {
            signal,
          }
        );
        const data = await response.json();

        // before adding to cache, check if cache size exceeds max cache size
        const cacheSize = Object.keys(cache.current).length;
        console.log("Cache Size", cacheSize);

        if (cacheSize >= MAX_CACHE_SIZE) {
          // If cache is full, remove the first item (oldest)
          const firstKey = Object.keys(cache.current)[0];
          console.log("Cache full, removing:", firstKey);
          delete cache.current[firstKey];
        }

        // Add new data to cache
        cache.current[query] = data.products;
        console.log("Added to cache:", query);

        setStatus(STATE.SUCCESS);
        cache.current[query] = data.products;
        setResult(data.products);
      } catch (error) {
        if (error.name !== "AbortError") {
          setStatus(STATE.ERROR);
        }
      }
    };

    // debounce fetchData
    // Wait 1000ms after user stops typing before fetching
    const timerId = setTimeout(fetchData, 1000);

    // Cleanup function
    return () => {
      clearTimeout(timerId);
      abortController.abort();
    };
  }, [query]);

  const handleClearInput = () => {
    setQuery("");
    setResult([]);
    inputRef.current?.focus();
  };

  return (
    <div className="typeahead-container">
      <div
        className={`search-input-wrapper ${isInputFocused ? "focused" : ""}`}
      >
        <FaSearch className="search-icon" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          className="search-input"
        />
        {query && (
          <button
            className="clear-button"
            onClick={handleClearInput}
            aria-label="Clear search"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {result.length > 0 || status !== STATE.SUCCESS ? (
        <div className="results-container">
          {status === STATE.LOADING && (
            <div className="status-message">
              <FaSpinner className="spinner" />
              <span>Searching...</span>
            </div>
          )}

          {status === STATE.ERROR && (
            <div className="status-message error">
              <FaExclamationCircle />
              <span>Something went wrong. Please try again.</span>
            </div>
          )}

          {status === STATE.SUCCESS && (
            <ul className="results-list">
              {result.map((item) => (
                <li key={item.id} className="result-item">
                  <div className="result-content">
                    {item.thumbnail && (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="result-thumbnail"
                      />
                    )}
                    <div className="result-info">
                      <h4 className="result-title">{item.title}</h4>
                      <p className="result-price">${item.price}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default TypeHead;
