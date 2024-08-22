import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { ThemeAtom } from "../../atoms/ThemeAtom";

const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
    const [theme] = useAtom(ThemeAtom);
    const [query, setQuery] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    useEffect(() => {
        onSearch(query);
    }, [query, onSearch]);

    return (
        <div className={`search-bar ${theme}`}>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search..."
                className={`search-input input input-bordered ${theme}`}
            />
        </div>
    );
};

export default SearchBar;