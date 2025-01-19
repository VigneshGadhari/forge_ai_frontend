// src/components/RecommendedWorkflows.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiService } from '../services/api';
import './RecommendedWorkflows.css';

const RecommendedWorkflows = () => {
    const navigate = useNavigate();
    const [workflows, setWorkflows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWorkflows();
    }, []);

    const fetchWorkflows = async () => {
        try {
            setLoading(true);
            const response = await ApiService.getWorkflows();
            setWorkflows(response.workflows);
        } catch (err) {
            setError('Failed to fetch workflows');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleWorkflowClick = (workflow) => {
        // Create nodes from the complete agent objects we get from the API
        const preselectedNodes = workflow.agents.map(agent => ({
            id: `${agent.id}-${Date.now()}`,
            data: { ...agent }
        }));

        // Navigate to editor with the preselected nodes and workflow information
        navigate('/editor', { 
            state: { 
                preselectedNodes,
                workflowId: workflow.id,
                workflowName: workflow.name,
                workflowDescription: workflow.description,
                workflowCategory: workflow.category
            } 
        });
    };

    if (loading) {
        return <div>Loading workflows...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="recommended-workflows">
            <h2>Recommended Workflows</h2>
            <div className="workflows-list">
                {workflows.map((workflow) => (
                    <div 
                        key={workflow.id} 
                        className="workflow-card"
                        onClick={() => handleWorkflowClick(workflow)}
                    >
                        <img 
                            src={workflow.thumbnail} 
                            alt={workflow.name} 
                            className="workflow-thumbnail" 
                        />
                        <div className="workflow-content">
                            <h3 className="workflow-name">{workflow.name}</h3>
                            <p className="workflow-description">{workflow.description}</p>
                            <div className="workflow-agents">
                                {workflow.agents.map((agent) => (
                                    <span key={agent.id} className="workflow-agent-tag">
                                        {agent.name} {/* Direct access to agent name from API response */}
                                    </span>
                                ))}
                            </div>
                            <button className="workflow-button">
                                Use This Workflow
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedWorkflows;