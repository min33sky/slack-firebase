import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import Chat from './components/Chat';
import Header from './components/Header';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import { auth } from './firebase';
import Spinner from 'react-spinkit';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg" alt="" />
          <Spinner name="ball-spin-fade-loader" color="pruple" fadeIn="none" />
        </AppLoadingContents>
      </AppLoading>
    );
  }

  return (
    <BrowserRouter>
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <AppBody>
            <Sidebar />
            <Switch>
              <Route exact path="/" component={Chat} />
            </Switch>
          </AppBody>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;

const AppLoading = styled.div`
  /*  */
`;

const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
  /*  */
`;
