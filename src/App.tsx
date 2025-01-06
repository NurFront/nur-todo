import React from 'react';
import './App.css';
import Second from './components/Second';
import Task from './components/Task'

const App = () => {

  return (
    <div>
      <Task />
      <Second />
      <div className='planner'></div>
      <div className='sidebar-planner'></div>
    </div>
  );
};

export default App;
