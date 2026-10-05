import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

function LayOut() {
  return ( 
    <>
      {/* Fixed header container with background, border, and shadow */}
      <div className="fixed top-0 left-0 right-0 border-b border-blue-100 bg-white/95 backdrop-blur-md shadow-sm z-50">
        <div className="container">
          <NavBar />
        </div>
      </div>
      
      {/* Main content wrapper with top padding so content doesn't hide under the fixed navbar */}
      <div className="container pt-20">
        <Outlet />
      </div>
    </>
  );
}

export default LayOut;