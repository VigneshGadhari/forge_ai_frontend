import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import './LandingPage.css';

const workflows = [
    {
        id: 1,
        name: "Workflow One",
        description: "Description for workflow one.",
        thumbnail: "thumbnail1.jpg", // Replace with actual image paths
    },
    {
        id: 2,
        name: "Workflow Two",
        description: "Description for workflow two.",
        thumbnail: "thumbnail2.jpg",
    },
    {
        id: 3,
        name: "Workflow Three",
        description: "Description for workflow three.",
        thumbnail: "thumbnail3.jpg",
    },
    {
        id: 4,
        name: "Workflow Four",
        description: "Description for workflow four.",
        thumbnail: "thumbnail4.jpg",
    },
    {
        id: 5,
        name: "Workflow Five",
        description: "Description for workflow five.",
        thumbnail: "thumbnail5.jpg",
    },
    {
        id: 6,
        name: "Workflow Six",
        description: "Description for workflow six.",
        thumbnail: "thumbnail6.jpg",
    },
];

const LandingPage = () => {
    const { toggleTheme } = useContext(ThemeContext);

    return (
        <div className="landing-page">
            {/* Theme Toggle Button */}
            <button onClick={toggleTheme} className="theme-toggle-button">
                Toggle Theme
            </button>

            {/* Search Bar */}
            <div className="search-bar">
                <input type="text" placeholder="Search directories..." />
                <button className="filter-button">🔍</button>
            </div>

            {/* Recommended Workflows */}
            <h2>Recommended Workflows</h2>
            <div className="workflow-list">
                {workflows.map(workflow => (
                    <div className="workflow-card" key={workflow.id}>
                        <img src={workflow.thumbnail} alt={`${workflow.name} Thumbnail`} />
                        <h3>{workflow.name}</h3>
                        <p>{workflow.description}</p>
                        <button className="view-details-button">View Details</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LandingPage; 