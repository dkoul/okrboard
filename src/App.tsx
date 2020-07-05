import React from 'react';
import './App.css';
import { Routes } from './components/Routes';
import { CreateWorkstation } from './components/CreateWorkstation';
import { CreateObjective } from './components/CreateObjective';
import { ObrBoards } from './components/ObrBoards';
import { KeyResults } from './components/KeyResults';
import { Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes />
      <main>
        <Switch>
          <Route path={`/create-workstation`} name="createWorkstation" exact={true} component={CreateWorkstation} />
          <Route path={`/create-objective`} name="createObjective" exact={true} component={CreateObjective} />
          <Route path={`/create-keyresult`} name="createKeyResult" exact={true} component={KeyResults} />
          <Route path={`/okr-board`} name="okrBoard" exact={true} component={ObrBoards} />
          <Redirect to={'/okr-board'} />
        </Switch>
      </main>
    </>
  );
}

export default App;
