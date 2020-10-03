import React from 'react';
import './App.css';
import Game from './classes/Game';
import TextGame from './components/TextGame';
import GameComponent from './components/GameComponent';

// import { Container, Row, Col, Button } from 'react-bootstrap';

class Home extends React.Component {
    constructor(props){
      super(props);
  }

  componentDidMount(){
  }

    render() {
        return (
            <GameComponent/>
        );
    }
}

export default Home;
