import React from 'react';
import Game from '../classes/Game';
import Team from '../classes/Team';
import TextGame from './TextGame';

// import { Container, Row, Col, Button } from 'react-bootstrap';

class GameComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {texts : []}
      this.next = this.next.bind(this);
  }

  componentDidMount(){
   	let team1 = new Team({color: "#fa4e65", number: this.props.numberCandidates, candidates: this.props.team1Candidates})
   	let team2 = new Team({color: "#d7c490", number: this.props.numberCandidates, candidates: this.props.team2Candidates})
    this.game = new Game({team1: team1, team2: team2})
    this.setState({ texts: this.game.getCurrentText()})
  }
  
  next() {
    this.setState({ texts: this.game.getCurrentText()})
  }

    render() {
        return (
          <div>
            <TextGame texts={this.state.texts}/>
            <button onClick={this.next}>Next</button>
          </div>
        );
    }
}

export default GameComponent;
