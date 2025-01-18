import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>About Us</h4>
                    <p>Building the future of AI workflows</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/workflows">Workflows</a></li>
                        <li><a href="/agents">AI Agents</a></li>
                        <li><a href="/pricing">Pricing</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Connect</h4>
                    <div className="social-links">
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-linkedin"></i></a>
                        <a href="#"><i className="fab fa-github"></i></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 AI Workflow Builder. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer; 