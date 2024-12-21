import React from "react";
import { useState, useEffect, useRef } from "react";
import mockDB from "../mockDB";
import SearchInput from "./SearchInput";
import SuggestionsList from "./SuggestionsList";
import SearchResults from "./SearchResults";

const AutoCompleteSearch: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [autocompleteItems, setAutocompleteItems] = useState<
    { title: string }[]
  >([]);
  const [searchHistory, setSearchHistory] = useState<
    { title: string; isRecent: boolean }[]
  >([]);
  const [results, setResults] = useState<
    { title: string; description?: string }[]
  >([]);
  const [searchTime, setSearchTime] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (autocompleteItems.length === 0) {
      setShowSuggestions(false);
    }
  }, [autocompleteItems]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const filtered = mockDB
        .filter((item) =>
          item.title.toLowerCase().startsWith(value.toLowerCase())
        )
        .slice(0, 10);
      setAutocompleteItems(filtered);
      setShowSuggestions(true);
    } else {
      setAutocompleteItems(
        searchHistory.map((history) => ({ title: history.title }))
      );
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (item: { title: string }) => {
    setInputValue(item.title);
    performSearch(item.title);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      performSearch(inputValue);
      setShowSuggestions(false);
    }
  };

  const performSearch = (query: string) => {
    const startTime = performance.now();
    const searchResults = mockDB.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    const endTime = performance.now();

    setSearchTime(Number((endTime - startTime).toFixed(2)));
    setResults(searchResults);

    if (!searchHistory.some((history) => history.title === query)) {
      setSearchHistory((prev) => [{ title: query, isRecent: true }, ...prev]);
    }
  };

  const handleRemoveHistory = (item: { title: string }) => {
    setSearchHistory((prev) =>
      prev.filter((history) => history.title !== item.title)
    );
    setAutocompleteItems((prev) =>
      prev.filter((autocomplete) => autocomplete.title !== item.title)
    );
  };

  return (
    <div className="container" ref={containerRef}>
      <div className="autocomplete">
        <SearchInput
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (!inputValue) {
              setAutocompleteItems(
                searchHistory.map((history) => ({ title: history.title }))
              );
            }
            if (searchHistory.length !== 0) {
              setShowSuggestions(true);
            }
          }}
        />
        {showSuggestions && (
          <SuggestionsList
            items={autocompleteItems}
            searchHistory={searchHistory}
            onClickItem={handleSuggestionClick}
            onRemoveHistory={handleRemoveHistory}
          />
        )}
      </div>
      <SearchResults results={results} searchTime={searchTime} />
    </div>
  );
};

export default AutoCompleteSearch;
