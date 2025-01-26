import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import Header from '../Components/Header/Header'
import Home from '../Components/Home/Home'

export default function Page() {
  return (
    <Router>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </Router>
  )
}
