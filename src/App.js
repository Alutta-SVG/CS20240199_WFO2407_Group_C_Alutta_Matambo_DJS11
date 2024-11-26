import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import ShowDetailsPage from './Components/ShowDetailePage';
import NavBar from './Components/sidebar';


const App = () => {
    return (
        <Router>
            <div>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/show/:id" element={<ShowDetailsPage />} />
                </Routes>
            </div>
        </Router>
    );
};
 
export default App;
