import React from 'react';
import Game from '../classes/Game';
import TextGame from './TextGame';

// import { Container, Row, Col, Button } from 'react-bootstrap';

class GameComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {texts : []}
      this.next = this.next.bind(this);
  }

  componentDidMount(){
    this.game = new Game()
    this.currentWeek = this.game.week()
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
