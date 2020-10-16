import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import '../App.css';
import { Link } from 'react-router-dom';

class Header extends React.Component {

    render(){
        return (
                <Navbar bg="dark" variant="dark" expand="md" className="mb-3">
                    <Link to="/"><Navbar.Brand className="logo">KOH-LANTA SIMULATOR</Navbar.Brand></Link>
                    <Nav className="mr-auto">
                        <Nav.Link href="/koh-lanta-simulator/contact">Contact</Nav.Link>
                    </Nav>
                </Navbar>
        );
    }
}

export default Header;
