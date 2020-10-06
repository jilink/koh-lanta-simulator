import React from 'react';
import { SliderPicker } from 'react-color';

import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import GameComponent from './GameComponent';
import Candidate from '../classes/Candidate';
import Team from '../classes/Team';

// import { Container, Row, Col, Button } from 'react-bootstrap';

class FormComponent extends React.Component {
    constructor(props){
      super(props);
	  this.state = {
		numberCandidates: 5,
		filling: true,
		step: 1,
		team1Candidates: undefined,
		team2Candidates: undefined,
		team1Name: undefined,
		team2Name: undefined,
		team1Color: '#fa4e65',
		team2Color: '#d7c490',
		teams: {
		  team1: null,
		  team2: null,
		}
	  }
	this.handleChange = this.handleChange.bind(this);
	this.handleChangeCandidate = this.handleChangeCandidate.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleStep = this.handleStep.bind(this);
	this.getCandidatesFromDic = this.getCandidatesFromDic.bind(this);
  }

  componentDidMount(){
  }

  handleChange(event) {
	this.setState({ [event.target.name]: event.target.value });
	console.log(this.state)
  }

  handleChangeTeam1ColorDrag = (color) => {
	this.setState({ team1Color: color.hex });
  }

  handleChangeTeam2ColorDrag = (color) => {
	this.setState({ team2Color: color.hex });
  }

  handleChangeTeam1Color = (color) => {
	this.setState({ team1Color: color.hex });
  }

  handleChangeTeam2Color = (color) => {
	this.setState({ team2Color: color.hex });
  }

  handleChangeCandidate(team, candidate, event) {
	this.setState({
	  teams: {
		[`team${team}`]: {
		  ...this.state.teams[`team${team}`],
		  [`candidate${candidate}`]: {
			...this.state.teams[`team${team}`][`candidate${candidate}`] || null,
			[event.target.name]: event.target.value }
		}
	  }
	});
  }

  handleSubmit(event) {
	this.setState({team1Candidates: this.getCandidatesFromDic(this.state.teams.team1)})
	this.setState({team2Candidates: this.getCandidatesFromDic(this.state.teams.team2)})
	this.setState({filling: false})
  }

  getCandidatesFromDic(dic) {
	let candidates = []
	let dicKeys = null
	if (dic) {
	  dicKeys = Object.keys(dic)
	  for (let candidate of dicKeys) {
		if (dic[candidate] && dic[candidate].name) {
		  console.log(candidate, "ici")
		  candidates.push(new Candidate(dic[candidate].name, Candidate.TYPE[dic[candidate].type], dic[candidate].genre))
		}
	  }
	  console.log(candidates)
	  if (candidates.length) {
		return candidates
	  }
	}
	return undefined
  }

  handleStep(event) {
	this.setState({step: 2})
	for (let i=0; i < this.state.numberCandidates; i++) {
	  this.setState({
		teams:
		{
		  team1:
		  {
		  ...this.state.teams.team1,
			[`candidate${i}`]: null
		  },
		  team2:
		  {
		  ...this.state.teams.team2,
			[`candidate${i}`]: null
		  }
		}
	  })
	}
  }
  
    render() {
	  const types = []
  	  const typeKeys = Object.keys(Candidate.TYPE)
      for (let i=0; i < typeKeys.length; i++) {
		types.push(<option key={`type${i}`} value={typeKeys[i]}>{Candidate.TYPE[typeKeys[i]].typeName}</option>)
	  }
	  const team1Form = []
	  const team2Form = []
	  for (let i=0; i<this.state.numberCandidates; i++) {
		team1Form.push(
			<Row key={i} onChange={(e) => this.handleChangeCandidate(1, i, e)}>
			  <Col className="mb-3">
				<Form.Control name={`name`} placeholder="Nom" maxLength="25"/>
			  </Col>
			  <Col>
				<Form.Control as="select" name={`genre`}>
				  <option value="H">Homme</option>
				  <option value="F">Femme</option>
				</Form.Control>
			  </Col>
			  <Col>
				<Form.Control as="select" name={`type`}>
					{types}
				</Form.Control>
			  </Col>
			</Row>
			)
		team2Form.push(
			<Row key={i} onChange={(e) => this.handleChangeCandidate(1, i, e)}>
			  <Col className="mb-3">
				<Form.Control name={`name`} placeholder="Nom" maxLength="25"/>
			  </Col>
			  <Col>
				<Form.Control as="select" name={`genre`}>
				  <option value="H">Homme</option>
				  <option value="F">Femme</option>
				</Form.Control>
			  </Col>
			  <Col>
				<Form.Control as="select" name={`type`}>
					{types}
				</Form.Control>
			  </Col>
			</Row>
			)
	  }
        return (
          <Container>
		  {this.state.filling ?
		  <div>
		  {this.state.step === 1 ?
			<Form>
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
			  <Button onClick={this.handleStep} variant="primary">
			  Next
			  </Button>
			</Form>
			:
			<Form>
				<Row className="align-items-center justify-content-center">
					<Col className="mb-3">
						<h1 className="text-white text-center text-stroke" style={{background: this.state.team1Color}}> TRIBU 1 </h1>
					</Col>
				</Row>
				<Row className="align-items-center justify-content-center">
					<Col className="mb-3">
						<Form.Control name={`team1Name`} placeholder="Nom de l'équipe" maxLength="25" onChange={this.handleChange}/>
					</Col>
					<Col className="mb-3">
						<SliderPicker color={ this.state.team1Color } onChange={ this.handleChangeTeam1ColorDrag }onChangeComplete={ this.handleChangeTeam1Color }/>
					</Col>
				</Row>
				{team1Form}
				<Row className="align-items-center justify-content-center">
					<Col className="mb-3">
						<h1 className="text-white text-center text-stroke" style={{background: this.state.team2Color}}> TRIBU 2 </h1>
					</Col>
				</Row>
				<Row className="align-items-center justify-content-center">
					<Col className="mb-3">
						<Form.Control name={`team2Name`} placeholder="Nom de l'équipe" maxLength="25" onChange={this.handleChange}/>
					</Col>
					<Col className="mb-3">
						<SliderPicker color={ this.state.team2Color } onChange={ this.handleChangeTeam2ColorDrag }onChangeComplete={ this.handleChangeTeam2Color }/>
					</Col>
				</Row>
				{team2Form}
				<Button onClick={this.handleSubmit} variant="primary">
					Submit
				</Button>
			</Form>

			  }
		  </div>
		  :
		  <GameComponent numberCandidates={this.state.numberCandidates} team1Candidates={this.state.team1Candidates} team2Candidates={this.state.team2Candidates} team1Name={this.state.team1Name} team2Name={this.state.team2Name} team1Color={this.state.team1Color} team2Color={this.state.team2Color} />
			  }
		  </Container>
		);
	}
}

export default FormComponent;
