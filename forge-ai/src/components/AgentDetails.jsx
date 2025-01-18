import React from 'react';
import '../pages/AgentDetails.css'; // Optional: Add styles for the AgentDetails

const AgentDetails = ({ agent, onClose }) => {
    return (
        <div className="agent-details-pane">
            <div className="details-header">
                <h2>{agent.name}</h2>
                <button className="close-button" onClick={onClose}>×</button>
            </div>
            <div className="details-content">
                <div className="detail-group">
                    <label>Description</label>
                    <p>{agent.description}</p>
                </div>
                <div className="detail-group">
                    <label>Category</label>
                    <p>{agent.category}</p>
                </div>
                <div className="detail-group">
                    <label>Input Types</label>
                    <div className="tags">
                        {agent.features.input.map(input => (
                            <span key={input} className="tag">{input}</span>
                        ))}
                    </div>
                </div>
                <div className="detail-group">
                    <label>Output</label>
                    <p>{agent.features.output}</p>
                </div>
                <div className="detail-group">
                    <label>Use Case</label>
                    <p>{agent.features.useCase}</p>
                </div>
                <div className="detail-group">
                    <label>Pricing</label>
                    <p>
                        {agent.features.pricing.free ? '✓ Free Tier Available' : '✗ No Free Tier'}<br />
                        Paid: {agent.features.pricing.paid}
                    </p>
                </div>
                <div className="detail-group">
                    <label>Platforms</label>
                    <div className="tags">
                        {agent.features.platforms.map(platform => (
                            <span key={platform} className="tag">{platform}</span>
                        ))}
                    </div>
                </div>
                <div className="detail-group">
                    <label>Integrations</label>
                    <div className="tags">
                        {agent.features.integration.map(int => (
                            <span key={int} className="tag">{int}</span>
                        ))}
                    </div>
                </div>
                <div className="detail-group">
                    <label>Active Users</label>
                    <p>{agent.features.users.toLocaleString()}</p>
                </div>
                <div className="detail-group links">
                    <a href={agent.documentation} target="_blank" rel="noopener noreferrer" className="link-button">
                        Documentation
                    </a>
                    <a href={agent.tutorial} target="_blank" rel="noopener noreferrer" className="link-button">
                        Tutorial
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AgentDetails; 