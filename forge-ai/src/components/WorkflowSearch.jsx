import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiService } from '../services/api';
import './WorkflowSearch.css';

const WorkflowSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [currentLoadingText, setCurrentLoadingText] = useState('');
    const navigate = useNavigate();

    const loadingTexts = [
        "Teaching AI agents to work together... 🤝",
        "Brewing the perfect workflow combination... ⚗️",
        "Consulting with our robot overlords... 🤖",
        "Analyzing your requirements with quantum precision... 🔍",
        "Summoning the most powerful AI agents... ✨",
        "Calculating optimal agent synergies... 💫",
        "Discovering hidden workflow potentials... 🎯",
        "Optimizing cross-agent communication... 📡",
        "Balancing the AI force... ⚖️",
        "Generating creative solutions... 🎨",
        "Mining the depths of AI knowledge... ⛏️",
        "Assembling your dream team of AI agents... 🌟",
        "Checking AI agent compatibility... 🤔",
        "Preparing your productivity boost... 🚀",
        "Maximizing workflow efficiency... ⚡",
        "Connecting neural pathways... 🧠",
        "Decoding the matrix of possibilities... 🌐",
        "Harmonizing AI capabilities... 🎵",
        "Crafting your digital workforce... 🛠️",
        "Unlocking advanced AI features... 🔓",
        "Synchronizing agent protocols... ⚙️",
        "Establishing secure AI connections... 🔒",
        "Calibrating AI precision... 🎯",
        "Loading years of AI experience... 📚",
        "Preparing your workflow transformation... 🦋",
        "Did you know? Our AI agents can process natural language! 📝",
        "Fun fact: Our platform combines over 50 specialized AI agents! 🤖",
        "Pro tip: AI workflows can save you hours of work! ⏰",
        "Interesting: Our AI agents learn from each other! 🎓",
        "Cool fact: You're about to use cutting-edge AI technology! 🔮"
    ];

    useEffect(() => {
        if (isLoading) {
            const textInterval = setInterval(() => {
                const randomText = loadingTexts[Math.floor(Math.random() * loadingTexts.length)];
                setCurrentLoadingText(randomText);
            }, 5000); // Changed from 3000 to 5000 (5 seconds)

            return () => clearInterval(textInterval);
        }
    }, [isLoading]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        setCurrentLoadingText(loadingTexts[0]);
        try {
            const response = await ApiService.suggestWorkflow(searchQuery);
            if (response.workflows.agents && response.workflows.agents.length > 0) {
                const preselectedNodes = response.workflows.agents.map(agent => ({
                    id: `${agent.id}-${Date.now()}`,
                    data: { ...agent }
                }));
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
            {isLoading && (
                <div className="search-overlay">
                    <div className="loading-container">
                        <div className="loading-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className="loading-text">{currentLoadingText}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkflowSearch; 