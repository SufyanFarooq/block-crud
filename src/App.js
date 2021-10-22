import './App.css';
import { useState, useEffect } from 'react';
import Connect from './components/Connect';
import AppBar from './components/AppBar';
import CrudFunction from './components/CrudFunction';
function App() {
  return (
    <div >
      <AppBar />
      <CrudFunction/>
      {/* <Connect  /> */}
     
    </div>
  );
}

export default App;
