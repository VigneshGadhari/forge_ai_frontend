// src/components/RecommendedWorkflows.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import workflowsData from '../data/workflowsTech.json';
import { allAgents } from '../data';
import './RecommendedWorkflows.css';

const RecommendedWorkflows = () => {
    const navigate = useNavigate();

    const handleWorkflowClick = (workflow) => {
        // Get full agent objects from the workflow's agent IDs
        const selectedAgents = workflow.agents.map(agentRef => {
            const category = allAgents[agentRef.category];
            return category.find(agent => agent.id === agentRef.id);
        }).filter(Boolean); // Remove any undefined agents

        // Navigate to editor with the selected agents
        navigate('/editor', { state: { preselectedAgents: selectedAgents } });
    };

    return (
        <div className="recommended-workflows">
            <h2>Recommended Workflows</h2>
            <div className="workflows-list">
                {workflowsData.workflows.map((workflow) => (
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
                                {workflow.agents.map((agent, index) => (
                                    <span key={agent.id} className="workflow-agent-tag">
                                        {allAgents[agent.category].find(a => a.id === agent.id)?.name}
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