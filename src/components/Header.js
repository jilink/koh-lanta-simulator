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
                        <Nav.Link><Link to="/contact" style={{ textDecoration: 'none', color: "hsla(0,0%,100%,.5)" }}>Contact</Link></Nav.Link>
                    </Nav>
                </Navbar>
        );
    }
}

export default Header;
