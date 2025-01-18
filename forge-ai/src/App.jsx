// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Editor from './pages/Editor';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/editor" element={<Editor />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;