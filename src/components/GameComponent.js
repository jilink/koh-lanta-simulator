import React from 'react';
import {isMobile} from 'react-device-detect';
import Game from '../classes/Game';
import Team from '../classes/Team';
import TextGame from './TextGame';
import TeamComponent from './TeamComponent';

import { Container, Row, Col, Button } from 'react-bootstrap';

class GameComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {texts : []}
      this.next = this.next.bind(this);
  }

  componentDidMount(){
    let team1 = new Team({name: this.props.team1Name, color: this.props.team1Color, number: this.props.numberCandidates, candidates: this.props.team1Candidates})
    let team2 = new Team({name: this.props.team2Name, color: this.props.team2Color, number: this.props.numberCandidates, candidates: this.props.team2Candidates})
    this.game = new Game({team1: team1, team2: team2})
    this.setState({ texts: this.game.getCurrentText()})
    this.setState({ team1: this.game.team1})
    this.setState({ team2: this.game.team2})
    this.setState({ candidatesTeam1: this.game.getTeam1DisplayCandidates()})
    this.setState({ candidatesTeam2: this.game.getTeam2DisplayCandidates()})
    this.setState({ candidatesTeam3: this.game.getTeam3DisplayCandidates()})
    this.setState({ solo: this.game.getDisplaySolo()})
  }
  
  next() {
    this.setState({ texts: this.game.getCurrentText()})
    this.setState({ candidatesTeam1: this.game.getTeam1DisplayCandidates()})
    this.setState({ candidatesTeam2: this.game.getTeam2DisplayCandidates()})
    this.setState({ candidatesTeam3: this.game.getTeam3DisplayCandidates()})
    if (!this.state.team3)
      this.setState({ team3: this.game.team3})
    this.setState({ solo: this.game.getDisplaySolo()})
  }

    render() {
        return (
            <Row>
              <Col>
              {this.state.candidatesTeam1 && !this.state.solo && !isMobile?
                  <TeamComponent candidates={this.state.candidatesTeam1} team={this.state.team1}/>
              :
                  null
              }
              {this.state.candidatesTeam2 && !this.state.solo && !isMobile ?
                  <TeamComponent candidates={this.state.candidatesTeam2} team={this.state.team2}/>
              :
                  null
              }
              {this.state.candidatesTeam3 && this.state.solo && !isMobile ?
                  <TeamComponent candidates={this.state.candidatesTeam3} team={this.state.team3}/>
              :
                  null
              }
              </Col>
              <Col md={8}>
                <TextGame texts={this.state.texts}/>
			  <Button onClick={this.next} variant="primary">
                Suivant
			  </Button>
              </Col>
            </Row>
        );
    }
}

export default GameComponent;
