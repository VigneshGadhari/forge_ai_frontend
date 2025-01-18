import React from 'react';
import '../pages/AgentNode.css'; // Optional: Add styles for the AgentNode

const AgentNode = ({ data, onSelect, onConnect, onDelete }) => {
    return (
        <div className="agent-node" onClick={() => onSelect(data)}>
            <div className="agent-node-header">
                <h4>{data.name}</h4>
                <button className="delete-node-button" onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering onSelect
                    onDelete();
                }}>×</button>
            </div>
            <p className="agent-description">{data.description}</p>
            <div className="key-features">
                <span className="feature-label">Users:</span>
                <span className="feature-value">{data.features.users}</span>
            </div>
            <button className="connect-button" onClick={(e) => {
                e.stopPropagation(); // Prevent triggering onSelect
                onConnect(e);
            }}>
                Connect
            </button>
        </div>
    );
};

export default AgentNode; 