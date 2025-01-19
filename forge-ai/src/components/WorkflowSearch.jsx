import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiService } from '../services/api';
import './WorkflowSearch.css';

const WorkflowSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        try {
            const response = await ApiService.suggestWorkflow(searchQuery);
            console.log(response)
            if (response.workflows.agents && response.workflows.agents.length > 0) {
                console.log("Went inside")
                const preselectedNodes = response.workflows.agents.map(agent => ({
                    id: `${agent.id}-${Date.now()}`,
                    data: { ...agent }
                }));
                console.log(preselectedNodes)
                navigate('/editor', {
                    state: {
                        preselectedNodes,
                        workflowId: response.workflows.id,
                        workflowName: response.workflows.name,
                        workflowDescription: response.workflows.description,
                        workflowCategory: response.workflows.category
                    }
                });
            } else {
                throw new Error('No workflow suggestions found');
            }
        } catch (error) {
            console.error('Error suggesting workflow:', error);
            // You might want to show an error message to the user
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`workflow-search-container ${isLoading ? 'loading' : ''}`}>
            <form onSubmit={handleSearch} className={`search-form ${isFocused ? 'focused' : ''}`}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Describe your workflow needs..."
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <div className="loader"></div>
                    ) : (
                        <i className="fas fa-wand-magic-sparkles"></i>
                    )}
                </button>
            </form>
            {isLoading && <div className="search-overlay">Generating your perfect workflow...</div>}
        </div>
    );
};

export default WorkflowSearch; 