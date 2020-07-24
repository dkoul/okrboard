import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'noty/lib/noty.css';
import 'noty/lib/themes/bootstrap-v4.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter, Route } from 'react-router-dom';

ReactDOM.render(
  <HashRouter>
    <Route exact={false} path="/" component={App} />
  </HashRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls. Learn
// more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
