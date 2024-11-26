import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import ShowDetailsPage from './Components/ShowDetailePage';


const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/show/:id" element={<ShowDetailsPage />} />
            </Routes>
        </Router>
    );
};

export default App;
