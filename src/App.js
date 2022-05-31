import React from 'react'
import './App.css';
import Table from './components/table.js';
import Message from './components/message.js';
import { GlobalProvider } from './context/GlobalState'
import Scoreboard from "./components/scoreboard";
import Login from "./components/login"
import Signup from './components/signup'

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Message />
        <div className="loginSignupCont">
          <Signup />
          <Login />
        </div>
        <Scoreboard />
        <Table />
      </div>
    </GlobalProvider>
  );
}

export default App;
