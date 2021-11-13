import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import ElektricnePolnilnice from './components/ElektricnePolnilnice.jsx';
import IzposojevalniceKoles from './components/IzposojevalniceKoles.jsx';
import Defibrilatorji from './components/Defibrilatorji.jsx';
import ParkirnaMesta from './components/ParkirnaMesta.jsx';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/parkirna-mesta">
              <ParkirnaMesta />
            </Route>
            <Route path="/elektricne-polnilnice">
              <ElektricnePolnilnice />
            </Route>
            <Route path="/izposojevalnice-koles">
              <IzposojevalniceKoles />
            </Route>
            <Route path="/defibrilatorji">
              <Defibrilatorji />
            </Route>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
