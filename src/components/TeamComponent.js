import React from 'react';
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'

class GameComponent extends React.Component {
    constructor(props){
      super(props);
  }

    render() {
		const candidates = []
		if (this.props.candidates) {
			console.log("LES CANDIDATES", this.props.candidates)
			for (let candidate of this.props.candidates) {
				candidates.push(<ListGroup.Item key={`${candidate.name}+${candidate.type.typeName}`}>{candidate.name}</ListGroup.Item>)
			}
		}
		
        return (
          <Container className="mb-2">
			<h1 className="text-white text-center text-stroke" style={{background: this.props.team.color}}>{this.props.team.name}</h1>
			<ListGroup>
			{candidates}
			</ListGroup>
          </Container>
        );
    }
}

export default GameComponent;
