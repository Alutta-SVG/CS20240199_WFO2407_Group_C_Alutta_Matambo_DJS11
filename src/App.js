import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import ShowDetailsPage from '../src/Components/ShowDetailsPage'; 
import Sidebar from '../src/Components/sidebar'; 
import FavoritesPage from '../src/Components/FavouritesPage'; 
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
                        <Route path="/Favourites" element={<FavoritesPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
