import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import '../App.css';

class Header extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
                <Navbar bg="dark" variant="dark" expand="md" className="mb-3">
                    <Navbar.Brand href="/" className="logo">KOH-LANTA SIMULATOR</Navbar.Brand>
                </Navbar>
        );
    }
}

export default Header;
