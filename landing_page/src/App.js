
import React from 'react';
import { Routes, Route } from "react-router"
import Grid from '@mui/material/Grid';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './App.css'

import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import ResponsiveAppBar from './components/ResponsiveAppBar';

function App(){
    return (
      <div className="App">

        <ResponsiveAppBar/>
        <br /><br />

        <Routes>
          <Route path = "/" element={<Home />} />
          <Route path = "/Home" element={<Home />} />
          <Route path = "/About" element={<About />} />
          <Route path = "/Contact" element={<Contact />} />
        </Routes>

      </div>
    );
  }

export default App;
