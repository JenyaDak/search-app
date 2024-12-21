import React from "react";
import { FC, ChangeEvent, KeyboardEvent } from "react";

interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
}

const SearchInput: FC<SearchInputProps> = ({
  value,
  onChange,
  onKeyDown,
  onFocus,
}) => {
  return (
    <div className="autocomplete-input-wrap">
      <span style={{ margin: "8px" }}>🔍</span>
      <input
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        placeholder="Search"
      />
    </div>
  );
};

export default SearchInput;
