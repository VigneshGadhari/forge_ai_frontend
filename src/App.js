import React from 'react';
import './App.css';
import { getCLS, getFID, getLCP } from 'web-vitals';
import LandingPage from './LandingPage';
import { ThemeProvider } from './ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <LandingPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
