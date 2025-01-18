// src/pages/HomePage.jsx
import React from 'react';
import Header from '../components/Headers.jsx';
import SearchBar from '../components/SearchBar.jsx';
import RecommendedWorkflows from '../components/RecommendedWorkflows.jsx';

const HomePage = () => {
    return (
        <div>
            <Header />
            <SearchBar />
            <RecommendedWorkflows />
        </div>
    );
};

export default HomePage;