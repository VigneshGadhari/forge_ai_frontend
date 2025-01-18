// src/components/RecommendedWorkflows.jsx
import React, { useEffect, useState } from 'react';
import workflowsData from '../data/workflow.json'; // Import dummy data
import './RecommendedWorkflows.css'; // Import the CSS for styling

const RecommendedWorkflows = () => {
    const [workflows, setWorkflows] = useState([]);

    useEffect(() => {
        // Simulate fetching data from a server
        setWorkflows(workflowsData);
    }, []);

    return (
        <div className="recommended-workflows">
            <h2>Recommended Workflows</h2>
            <div className="workflows-list">
                {workflows.map((workflow) => (
                    <div key={workflow.id} className="workflow-card">
                        <img src={workflow.thumbnail} alt={workflow.name} className="workflow-thumbnail" />
                        <h3 className="workflow-name">{workflow.name}</h3>
                        <p className="workflow-description">{workflow.description}</p>
                        <a href={workflow.link} className="workflow-link">View Details</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedWorkflows;