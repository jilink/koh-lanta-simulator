import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactGa from 'react-ga';

function App() {

  useEffect(() => {
    ReactGa.initialize('UA-180345460-1')
    // to report page view
    ReactGa.pageview('/')
  }, [])

  return (
    <Home/>
  );
}

export default App;
