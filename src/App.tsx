import React from 'react';
import './css/App.css';
import { Routes } from './components/Routes';
import { CreateDepartment } from './components/CreateDepartment';
import { CreateObjective } from './components/CreateObjective';
import { ObrBoards } from './components/ObrBoards';
import { KeyResults } from './components/KeyResults';
import { Route, Switch, Redirect } from 'react-router-dom';
import { WorkstationContextProvider } from './context/WorkstationContext';
import { CreateUser } from './components/CreateUser';

function App() {
  return (
    <WorkstationContextProvider>
      <Routes />
      <main>
        <Switch>
          <Route path={`/create-department`} name="createDepartment" exact={true} component={CreateDepartment} />
          <Route path={`/create-objective`} name="createObjective" exact={true} component={CreateObjective} />
          <Route path={`/create-user`} name="createUser" exact={true} component={CreateUser} />
          <Route path={`/create-keyresult`} name="createKeyResult" exact={true} component={KeyResults} />
          <Route path={`/okr-board`} name="okrBoard" exact={true} component={ObrBoards} />
          <Redirect to={'/okr-board'} />
        </Switch>
      </main>
    </WorkstationContextProvider>
  );
}

export default App;
