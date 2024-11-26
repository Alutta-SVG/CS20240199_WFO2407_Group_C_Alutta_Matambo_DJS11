import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import ShowDetailsPage from '../src/Components/ShowDetailePage';
import Sidebar from './Components/sidebar';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <Sidebar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/show/:id" element={<ShowDetailsPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
