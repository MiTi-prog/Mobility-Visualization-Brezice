import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import ElektricnePolnilnice from './components/ElektricnePolnilnice.jsx';
import IzposojevalniceKoles from './components/IzposojevalniceKoles.jsx';
import Defibrilatorji from './components/Defibrilatorji.jsx';
import ParkirnaMesta from './components/ParkirnaMesta.jsx';
import './app.css';


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Router>
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
