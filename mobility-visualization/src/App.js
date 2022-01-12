import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import ElektricnePolnilnice from './components/ElektricnePolnilnice.jsx';
import IzposojevalniceKoles from './components/IzposojevalniceKoles.jsx';
import Defibrilatorji from './components/Defibrilatorji.jsx';
import ParkirnaMesta from './components/ParkirnaMesta.jsx';
import About from './components/About';
import './app.css';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import MerilciHitrosti from './components/MerilciHitrosti';
import Parkirna from './components/Parkirna';

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/parkirna-mesta" />
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
            <Route path="/merilci-hitrosti">
              <MerilciHitrosti />
            </Route>
            <Route path="/o-projektu">
              <About />
            </Route>
            <Route path="/test">
              <Parkirna />
            </Route>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
