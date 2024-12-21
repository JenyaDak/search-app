import React from "react";
import { FC } from "react";

interface SearchResultsProps {
  results: { title: string; description?: string }[];
  searchTime: number;
}

const SearchResults: FC<SearchResultsProps> = ({ results, searchTime }) => {
  return (
    <div className="results">
      {results.length !== 0 && (
        <p>
          Found {results.length} results in {searchTime}ms
        </p>
      )}

      <ul>
        {results.map((result) => (
          <li key={result.title}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" onClick={(e) => e.preventDefault()}>
              {result.title}
            </a>
            <p>{result.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
