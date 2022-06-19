import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VideoCall from './components/VideoCall';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<VideoCall />}>
          {/* <Route index element={<Home />} />
          <Route path='teams' element={<Teams />}>
          </Route> */}
        </Route>
      </Routes>
    </Router>
  );
}
