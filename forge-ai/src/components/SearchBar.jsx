// src/components/SearchBar.jsx
import React from 'react';
import './SearchBar.css'; // Import the CSS for styling

const SearchBar = () => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search directories..."
                className="search-input"
            />
            <button className="search-button">
                <i className="fas fa-filter"></i> {/* Font Awesome filter icon */}
            </button>
        </div>
    );
};

export default SearchBar;