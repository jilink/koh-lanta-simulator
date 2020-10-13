import React from 'react';
import ReactGa from 'react-ga';
import emailjs from 'emailjs-com'

import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

class Contact extends React.Component {

	constructor(props){
		super(props);
		this.sendEmail = this.sendEmail.bind(this);
	}

	componentDidMount() {
		ReactGa.pageview('/contact')
	}

	sendEmail(e) {
		e.preventDefault();
		emailjs.sendForm('gmail', 'template_dr88k0s', e.target, 'user_zBglHhqUaQ7omCp7GvAHz')
			.then((result) => {
				alert("Bien reçu nous reviendrons vers vous");
			}, (error) => {
				alert(error.text);
			});
		e.target.reset()
		ReactGa.event({
			category:'Button',
			action: 'Sent contact mail'
		})
	}

    render() {
        return (
          <Container>
			<Form onSubmit={this.sendEmail} varient="info">
			  <Form.Group controlId="ControlInput">
			    <Form.Label>Addresse mail</Form.Label>
			    <Form.Control required type="email" name="reply_to" placeholder="name@example.com" />
			  </Form.Group>
			  <Form.Group controlId="ControlInput2">
			    <Form.Label>Nom</Form.Label>
			    <Form.Control required type="text" name="name" placeholder="Claude" />
			  </Form.Group>
			  <Form.Group controlId="ControlInput3">
			    <Form.Label>Objet</Form.Label>
			    <Form.Control required type="text" name="subject" placeholder="Super site, comment puis-je vous remercier d'avoir rendue ma vie meilleure ?" />
			  </Form.Group>
			  <Form.Group controlId="ControlTextarea1">
			    <Form.Label>Message</Form.Label>
			    <Form.Control required as="textarea" name="message" rows={3} />
			  </Form.Group>
			  <Button variant="info" type="submit" className="justify-content-md-center mx-auto">
				Envoyer
			  </Button>
			</Form>

		  </Container>
		);
	}
}

export default Contact;
