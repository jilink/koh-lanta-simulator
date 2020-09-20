import React from 'react';
import './App.css';
import Candidate from './classes/Candidate';
import Team from './classes/Team';
import Game from './classes/Game';

// import { Container, Row, Col, Button } from 'react-bootstrap';

class Home extends React.Component {
    constructor(props){
      super(props);
      // this.state = {dialog : john.dialogue(), action: john.action()}
    }

  componentDidMount(){
      new Game()
  }

    render() {
        return (
          <div>
            {/* <p> {this.state.dialog} </p> */}
            {/* {this.state.action} */}
          </div>
        );
    }
}

export default Home;
