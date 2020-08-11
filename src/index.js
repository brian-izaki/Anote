import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './css/pure-min.css';
import './css/grids-responsive-min.css';
import './css/global.css';
import * as serviceWorker from './serviceWorker';
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';

ReactDOM.render(
  <BrowserRouter>
    <Switch >
      <Route path="/" component={Home} exact/>
      <Route path="/cadastro" component={Cadastro}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
