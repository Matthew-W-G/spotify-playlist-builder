import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import React from 'react'

function App() {
  return (
    <React.Fragment>
      <Header></Header>
      <Dashboard></Dashboard>
    </React.Fragment>
  );
}

export default App;
