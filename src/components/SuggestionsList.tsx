import React from "react";
import { FC } from "react";

interface SuggestionsListProps {
  items: { title: string }[];
  searchHistory: { title: string; isRecent: boolean }[];
  onClickItem: (item: { title: string }) => void;
  onRemoveHistory: (item: { title: string }) => void;
}

const SuggestionsList: FC<SuggestionsListProps> = ({
  items,
  searchHistory,
  onClickItem,
  onRemoveHistory,
}) => {
  return (
    <ul className="suggestions" data-testid="suggestions">
      {items.map((item) => (
        <li
          key={item.title}
          style={{
            color: searchHistory.some(
              (history) => history.title === item.title && history.isRecent
            )
              ? "purple"
              : "black",
          }}
          onClick={() => onClickItem(item)}
        >
          {item.title}
          {searchHistory.some(
            (history) => history.title === item.title && history.isRecent
          ) && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveHistory({ title: item.title });
              }}
            >
              Remove
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default SuggestionsList;
