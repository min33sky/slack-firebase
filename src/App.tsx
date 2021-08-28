import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import Chat from './components/Chat';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppBody>
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Chat} />
        </Switch>
      </AppBody>
    </BrowserRouter>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
  /*  */
`;
