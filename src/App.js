/* eslint-disable eqeqeq */
import { useEffect, useState } from 'react';
import { Navbar, Row } from 'react-bootstrap';
import './App.css';
import TaskCard from './components/TaskCard';
import TaskEdit from './components/TaskEdit';
import TasksList from './components/TasksList';
import { BASE_API_URL } from './constants';

// import AddTask from './components/TaskCard';


function App() {
  return (
    <div className="App">
     <>
      
      <Navbar bg="dark" variant="dark" style={{display:'block'}}>
          
          <h1 style={{color:'#44AC99',textAlign:'center'}}>
              Tasks Lists
          </h1>
      </Navbar>

      <TasksList></TasksList>
      
      </>
    </div>
  );
}

export default App;
