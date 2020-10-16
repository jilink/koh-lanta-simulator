import React from 'react';
import './App.css';
import Home from './Home.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactGa from 'react-ga';
import { createBrowserHistory as createHistory } from 'history'

function App() {
  const history = createHistory()
  ReactGa.initialize('UA-180345460-1')
  history.listen((location, action) => {
    ReactGa.pageview(location.pathname + location.search);
  }); 

  return (
    <Home/>
  );
}

export default App;
