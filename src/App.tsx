import React from 'react';
import './App.css';
import Task from './components/Task'
import Sidebar from './components/Sidebar';

const App = () => {

  return (
    <div>
      <Task />
      <Sidebar />
      <div className='planner'></div>
      <div className='sidebar-planner'></div>
    </div>
  );
};

export default App;
