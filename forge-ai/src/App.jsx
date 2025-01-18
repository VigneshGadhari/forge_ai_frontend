// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Editor from './pages/Editor';

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <Link to="/editor" style={{ margin: '20px', textDecoration: 'none' }}>
                        <button style={{ padding: '10px 20px', backgroundColor: '#ff6f20', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            Create New Workflow
                        </button>
                    </Link>
                </nav>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/editor" element={<Editor />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;