import React from 'react';
import './App.css';
import MainRouter from './MainRouter';

// import { Container, Row, Col, Button } from 'react-bootstrap';

class Home extends React.Component {
    constructor(props){
      super(props);
  }

  componentDidMount(){
  }

    render() {
        return (
          <MainRouter/>
        );
    }
}

export default Home;
