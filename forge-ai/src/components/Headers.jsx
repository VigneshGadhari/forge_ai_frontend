// src/components/Header.jsx
import React from 'react';
import './Header.css'; // Import the CSS for styling

const Header = () => {
    return (
        <header className="header">
            <h1 className="header-title">AI Agent Marketplace</h1>
            <p className="header-subtitle">Find the best AI agents for your needs</p>
        </header>
    );
};

export default Header;