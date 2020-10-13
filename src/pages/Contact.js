import React from 'react';
import ReactGa from 'react-ga';

import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

class Contact extends React.Component {

	constructor(props){
		super(props);
		this.state = {
		}
	}

	componentDidMount() {
		ReactGa.pageview('/contact')
	}

    render() {
        return (
          <Container>
          coucou
		  </Container>
		);
	}
}

export default Contact;
