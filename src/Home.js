import React from 'react';
import './App.css';
import Game from './classes/Game';
import TextGame from './components/TextGame';
import FormComponent from './components/FormComponent';

// import { Container, Row, Col, Button } from 'react-bootstrap';

class Home extends React.Component {
    constructor(props){
      super(props);
  }

  componentDidMount(){
  }

    render() {
        return (
            <FormComponent/>
            
        );
    }
}

export default Home;
