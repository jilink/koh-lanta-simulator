import React from 'react';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import GameComponent from './GameComponent';

// import { Container, Row, Col, Button } from 'react-bootstrap';

class FormComponent extends React.Component {
    constructor(props){
      super(props);
	this.state = {numberCandidates: 5, filling: true}
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
  }

  handleChange(event) {
	this.setState({ [event.target.name]: event.target.value });
	console.log(this.state)
  }

  handleSubmit(event) {
	this.setState({filling: false})
	
  }
  
    render() {
        return (
          <Container>
		  {this.state.filling ?
			<Form onSubmit={this.handleSubmit}>
			  <Form.Group controlId="numberCandidate">
				<Form.Label>Nombre de candidats par équipe</Form.Label>
				<Form.Control as="select" name="numberCandidates" onChange={this.handleChange}>
				  <option value="5">5</option>
				  <option value="6">6</option>
				  <option value="7">7</option>
				  <option value="8">8</option>
				  <option value="9">9</option>
				</Form.Control>
			  </Form.Group>
			  <Button variant="primary" type="submit">
			  Submit
			  </Button>
			</Form>
		:
		  <GameComponent numberCandidates={this.state.numberCandidates}/>
		}
		</Container>
        );
    }
}

export default FormComponent;
