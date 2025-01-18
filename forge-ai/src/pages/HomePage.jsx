// src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Headers';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import RecommendedWorkflows from '../components/RecommendedWorkflows';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <Header />
            <main>
                <section className="hero-section">
                    <div className="hero-content">
                        <h1>Build Your AI Workflow</h1>
                        <p>Combine powerful AI agents to create custom workflows</p>
                        <SearchBar />
                    </div>
                </section>

                <section className="featured-section">
                    <h2>Featured AI Agents</h2>
                    <div className="featured-cards">
                        <div className="feature-card">
                            <i className="fas fa-paint-brush"></i>
                            <h3>UI/UX Design</h3>
                            <p>Create stunning interfaces with AI-powered design tools</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-code"></i>
                            <h3>Code Generation</h3>
                            <p>Accelerate development with AI code assistance</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-chart-line"></i>
                            <h3>Data Analytics</h3>
                            <p>Transform data into actionable insights</p>
                        </div>
                    </div>
                </section>

                <RecommendedWorkflows />

                <section className="contact-section">
                    <div className="contact-content">
                        <h2>Need Help?</h2>
                        <p>Our team is here to assist you in building the perfect AI workflow</p>
                        <button onClick={() => navigate('/contact')} className="contact-button">
                            Contact Us
                        </button>
                    </div>
                </section>
            </main>

            <button
                className="create-workflow-button"
                onClick={() => navigate('/editor')}
            >
                <i className="fas fa-plus"></i>
                Create New Workflow
            </button>

            <Footer />
        </div>
    );
};

export default HomePage;