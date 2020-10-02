import React from 'react';
import './App.css';
import Game from './classes/Game';
import TextGame from './components/TextGame';

// import { Container, Row, Col, Button } from 'react-bootstrap';

class Home extends React.Component {
    constructor(props){
      super(props);
      this.state = {texts : []}
      this.next = this.next.bind(this);
  }

  componentDidMount(){
    this.game = new Game()
    this.currentWeek = this.game.week()
    this.num = 10
    this.setState({ texts: this.currentWeek.slice(0,this.num)})
  }
  
  next() {
    this.num+=2
    this.setState({ texts: this.currentWeek.slice(this.num-10,this.num)})
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

export default Home;
