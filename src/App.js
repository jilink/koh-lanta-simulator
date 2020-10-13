import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactGa from 'react-ga';
import createHistory from 'history/createBrowserHistory'

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
