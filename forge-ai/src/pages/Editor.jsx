import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {ApiService} from '../services/api';
import {useAgents} from '../hooks/useAgents';
import './Editor.css';
import Checkout from './Checkout';

const AgentDialog = ({ onClose, onSelect, existingAgents }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [agents, setAgents] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAgents();
    }, []);

    const fetchAgents = async () => {
        try {
            setLoading(true);
            const response = await ApiService.getAgents();
            if (response.success) {
                setAgents(response.data);
            } else {
                setError('Failed to fetch agents');
            }
        } catch (err) {
            setError('Error fetching agents');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryToggle = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    const filteredAgents = React.useMemo(() => {
        const allAgents = Object.values(agents).flat();
        return allAgents.filter(agent =>
            (!existingAgents.includes(agent.id)) &&
            (selectedCategories.length === 0 || selectedCategories.includes(agent.category)) &&
            (agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                agent.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [agents, selectedCategories, searchTerm, existingAgents]);

    if (loading) {
        return (
            <div className="dialog-overlay">
                <div className="agent-dialog">
                    <div className="dialog-header">
                        <h2>Loading agents...</h2>
                        <button className="close-button" onClick={onClose}>×</button>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dialog-overlay">
                <div className="agent-dialog">
                    <div className="dialog-header">
                        <h2>Error</h2>
                        <button className="close-button" onClick={onClose}>×</button>
                    </div>
                    <div className="dialog-content">
                        <p className="error">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="dialog-overlay" onClick={onClose}>
            <div className="agent-dialog" onClick={e => e.stopPropagation()}>
                <div className="dialog-header">
                    <h2>Select AI Agent</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <input
                    type="text"
                    placeholder="Search agents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="dialog-search"
                />
                <div className="category-chips">
                    {Object.keys(agents).map(category => (
                        <span
                            key={category}
                            className={`chip ${selectedCategories.includes(category) ? 'selected' : ''}`}
                            onClick={() => handleCategoryToggle(category)}
                        >
                            {category}
                        </span>
                    ))}
                </div>
                <div className="agent-list">
                    {filteredAgents.map(agent => (
                        <div
                            key={agent.id}
                            className="agent-list-item"
                            onClick={() => {
                                onSelect(agent);
                                onClose();
                            }}
                        >
                            <div className="agent-list-item-header">
                                <h4>{agent.name}</h4>
                                <div className="agent-list-item-meta">
                                    <span className="agent-rating">★ {agent.rating}</span>
                                    <span className="agent-price">{agent.features.pricing.paid}</span>
                                </div>
                            </div>
                            <p>{agent.description}</p>
                            <div className="agent-list-item-features">
                                {agent.features.pricing.free && (
                                    <span className="feature-tag free">Free Tier Available</span>
                                )}
                                <span className="feature-tag users">{agent.features.users.toLocaleString()} Users</span>
                                <span className="feature-tag accuracy">Accuracy: {agent.features.accuracy}</span>
                            </div>
                            <img src={agent.imageUrl} alt={agent.name} className="agent-image" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

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
                        {agent.features.pricing.free ? '✓ Free Tier Available' : '✗ No Free Tier'}<br/>
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
                {Object.keys(agent.features).map((key) => {
                    if (!['input', 'output', 'useCase', 'pricing', 'platforms', 'integration'].includes(key)) {
                        return (
                            <div className="detail-group" key={key}>
                                <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                                <p>{agent.features[key]}</p>
                            </div>
                        );
                    }
                    return null;
                })}
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

const AgentNode = ({ data, onConnect, onDelete, id, onSelect }) => {
    const keyFeatures = [
        { label: 'Use Case', value: data.features.useCase },
        { label: 'Pricing', value: data.features.pricing.paid },
        { label: 'Accuracy', value: data.features.accuracy }
    ];

    return (
        <div className="agent-node" id={id} onClick={() => onSelect(data)}>
            <div className="agent-node-header">
                <h4>{data.name}</h4>
                <div className="agent-rating-container">
                    <span className="rating-star">★</span>
                    <span className="rating-number">{data.features.rating}</span>
                </div>
                <button className="delete-node-button" onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}>×</button>
            </div>
            <div className="agent-node-content">
                <p className="agent-description">{data.description}</p>
                <div className="key-features">
                    {keyFeatures.map(feature => (
                        <div key={feature.label} className="key-feature">
                            <span className="feature-label">{feature.label}:</span>
                            <span className="feature-value">{feature.value}</span>
                        </div>
                    ))}
                </div>
            </div>
            <button
                className="connect-button"
                onClick={(e) => {
                    e.stopPropagation();
                    onConnect(e);
                }}
            >
                +
            </button>
        </div>
    );
};

const SubscriptionSummary = ({ agents, onCheckout }) => {
    const totalCost = agents.reduce((sum, agent) => {
        return sum + agent.data.features.pricing.paid; // Directly use the numeric value
    }, 0);

    return (
        <div className="subscription-summary">
            <h3>Subscription Summary</h3>
            <div className="summary-content">
                {agents.map(agent => (
                    <div key={agent.id} className="summary-item">
                        <span>{agent.data.name}</span>
                        <span>${agent.data.features.pricing.paid.toFixed(2)}</span> {/* Format as needed */}
                    </div>
                ))}
                <div className="summary-total">
                    <span>Total Monthly Cost</span>
                    <span>${totalCost.toFixed(2)}</span>
                </div>
                <button className="checkout-button" onClick={onCheckout}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

const Editor = () => {
    const location = useLocation();
    const { agents, loading, error } = useAgents();
    const [nodes, setNodes] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [showCheckout, setShowCheckout] = useState(false);

    // Handle preselected agents from workflows
    useEffect(() => {
        if (location.state?.preselectedAgents) {
            const preselectedNodes = location.state.preselectedAgents.map(agent => ({
                id: `${agent.id}-${Date.now()}`,
                data: { ...agent }
            }));
            setNodes(preselectedNodes);
        }
    }, [location.state]);

    const addAgentToWorkflow = (agent) => {
        const exists = nodes.some(node => node.data.id === agent.id);
        if (!exists) {
            const newNode = {
                id: `${agent.id}-${Date.now()}`,
                data: { ...agent }
            };
            setNodes(prev => [...prev, newNode]);
        } else {
            alert(`${agent.name} is already added to the workflow.`);
        }
    };

    const handleDeleteNode = (nodeId) => {
        setNodes(prev => prev.filter(node => node.id !== nodeId));
    };

    const handleCheckout = () => {
        setShowCheckout(true);
    };

    const handleConnectClick = (e) => {
        e.stopPropagation();
        setShowDialog(true);
    };

    if (showCheckout) {
        return (
            <Checkout
                agents={nodes}
                onBack={() => setShowCheckout(false)}
            />
        );
    }

    return (
        <div className="editor-layout">
            <div className="editor-main">
                <div className="editor-header">
                    <h1>AI Agent Workflow Builder</h1>
                    <p className="editor-subtitle">Select the best AI agents for your workflow</p>
                    {nodes.length > 0 && (
                        <div className="workflow-stats">
                            <span className="stat">
                                <span className="stat-label">Agents Selected:</span>
                                <span className="stat-value">{nodes.length}</span>
                            </span>
                            <span className="stat">
                                <span className="stat-label">Total Monthly Cost:</span>
                                <span className="stat-value">
                                    ${nodes.reduce((sum, node) => {
                                    const price = node.data.features.pricing.paid; // Directly use the numeric value
                                    return sum + price; // No need for replace
                                }, 0).toFixed(2)}
                                </span>
                            </span>
                        </div>
                    )}
                </div>

                <div className="workflow-canvas">
                    {nodes.length === 0 ? (
                        <div
                            className="empty-state"
                            onClick={() => setShowDialog(true)}
                        >
                            <h2>Start Building Your AI Workflow</h2>
                            <p>Click to add your first AI agent</p>
                        </div>
                    ) : (
                        <div className="nodes-container">
                            {nodes.map((node) => (
                                <AgentNode
                                    key={node.id}
                                    id={node.id}
                                    data={node.data}
                                    onConnect={handleConnectClick}
                                    onDelete={() => handleDeleteNode(node.id)}
                                    onSelect={(agent) => {
                                        setSelectedAgent(agent);
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {selectedAgent && (
                <AgentDetails
                    agent={selectedAgent}
                    onClose={() => setSelectedAgent(null)}
                />
            )}

            {nodes.length > 0 && (
                <SubscriptionSummary
                    agents={nodes}
                    onCheckout={handleCheckout}
                />
            )}

            {showDialog && (
                <AgentDialog
                    onClose={() => setShowDialog(false)}
                    onSelect={(agent) => {
                        addAgentToWorkflow(agent);
                        setShowDialog(false);
                    }}
                    existingAgents={nodes.map(n => n.data.id)}
                />
            )}
        </div>
    );
};

export default Editor;