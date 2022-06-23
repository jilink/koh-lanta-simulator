import React from 'react';
import { SliderPicker } from 'react-color';
import ReactGa from 'react-ga';

import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image'

import GameComponent from './GameComponent';
import Candidate from '../classes/Candidate';


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
		...this.state.teams,
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
	ReactGa.event({
		category:'Button',
		action: 'Launched simulation'
	})
  }

  getCandidatesFromDic(dic) {
	let candidates = []
	let dicKeys = null
	if (dic) {
	  dicKeys = Object.keys(dic)
	  for (let candidate of dicKeys) {
		if (dic[candidate] && dic[candidate].name) {
		  candidates.push(new Candidate(dic[candidate].name, Candidate.TYPE[dic[candidate].type], dic[candidate].genre))
		}
	  }
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
	ReactGa.event({
		category:'Button',
		action: 'Started form'
	})
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
			<Row key={i} onChange={(e) => this.handleChangeCandidate(2, i, e)}>
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
            {this.state.filling ? (
              <div>
                {this.state.step === 1 ? (
                  <Form>
                    <Alert variant="info">
                      <Alert.Heading className="text-center">
                        L'AVENTURE COMMENCE
                      </Alert.Heading>
                      <p>
                        Bienvenue dans la version bêta de Koh-Lanta Simulator,
                        n'hésitez pas à partager votre avis et votre expérience
                        dans la partie contact
                      </p>
                    </Alert>
                    <Form.Group
                      as={Row}
                      controlId="numberCandidate"
                      className="justify-content-md-center"
                    >
                      <Form.Label column sm="3">
                        Nombre de candidats par équipe
                      </Form.Label>
                      <Col sm="2">
                        <Form.Control
                          as="select"
                          name="numberCandidates"
                          onChange={this.handleChange}
                        >
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                        </Form.Control>
                      </Col>
                    </Form.Group>
                    <Button
                      className="m-3"
                      onClick={this.handleStep}
                      variant="primary"
                    >
                      Suivant
                    </Button>
                    <Col className="text-center" sm="12">
                      <Alert variant="info">
                        <Alert.Heading className="text-center">
                          Je prépare un nouveau jeu !
                        </Alert.Heading>
                        <p>
                          Merci de votre intérêt pour koh-lanta simulator qui
                          est un très vieux projet tout moche mais que j'aime quand
                          même. Aujourd'hui je prépare un autre jeu autour du
                          même thème
                        </p>
                        <a rel="noopener noreferrer" target="_blank" href="https://cozy-surviving.cozy-codeur.fr">
                          Cliquez ici pour en savoir plus sur Cozy Surviving
                        </a>
                      </Alert>
                      <Image
                        src="./cozy-surviving.gif"
                        style={{ width: "50%" }}
                      />
                    </Col>
                  </Form>
                ) : (
                  <Form>
                    <Alert variant="info">
                      <Alert.Heading className="text-center">
                        INFORMATION
                      </Alert.Heading>
                      <p>
                        Tous les noms laissés vides seront attribués
                        aléatoirement (même le nom de équipes) vous n'avez
                        aucune obligation de tout remplir pour lancer la
                        simulation
                      </p>
                    </Alert>
                    <Row className="align-items-center justify-content-center">
                      <Col className="mb-3">
                        <h1
                          className="text-white text-center text-stroke"
                          style={{ background: this.state.team1Color }}
                        >
                          {" "}
                          TRIBU 1{" "}
                        </h1>
                      </Col>
                    </Row>
                    <Row className="align-items-center justify-content-center">
                      <Col className="mb-3">
                        <Form.Control
                          name={`team1Name`}
                          placeholder="Nom de l'équipe"
                          maxLength="25"
                          onChange={this.handleChange}
                        />
                      </Col>
                      <Col className="mb-3">
                        <SliderPicker
                          color={this.state.team1Color}
                          onChange={this.handleChangeTeam1ColorDrag}
                          onChangeComplete={this.handleChangeTeam1Color}
                        />
                      </Col>
                    </Row>
                    {team1Form}
                    <Row className="align-items-center justify-content-center">
                      <Col className="mb-3">
                        <h1
                          className="text-white text-center text-stroke"
                          style={{ background: this.state.team2Color }}
                        >
                          {" "}
                          TRIBU 2{" "}
                        </h1>
                      </Col>
                    </Row>
                    <Row className="align-items-center justify-content-center">
                      <Col className="mb-3">
                        <Form.Control
                          name={`team2Name`}
                          placeholder="Nom de l'équipe"
                          maxLength="25"
                          onChange={this.handleChange}
                        />
                      </Col>
                      <Col className="mb-3">
                        <SliderPicker
                          color={this.state.team2Color}
                          onChange={this.handleChangeTeam2ColorDrag}
                          onChangeComplete={this.handleChangeTeam2Color}
                        />
                      </Col>
                    </Row>
                    {team2Form}
                    <Button onClick={this.handleSubmit} variant="success">
                      Lancer la simulation
                    </Button>
                  </Form>
                )}
              </div>
            ) : (
              <GameComponent
                numberCandidates={this.state.numberCandidates}
                team1Candidates={this.state.team1Candidates}
                team2Candidates={this.state.team2Candidates}
                team1Name={this.state.team1Name}
                team2Name={this.state.team2Name}
                team1Color={this.state.team1Color}
                team2Color={this.state.team2Color}
              />
            )}
          </Container>
        );
	}
}

export default FormComponent;
