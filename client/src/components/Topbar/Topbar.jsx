import React from "react";
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Topbar() {
	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<Navbar.Brand href="/">Show</Navbar.Brand>

				<Button>
					<Nav.Link href="/login" className="profileLink">Log In</Nav.Link>
				</Button>
			</Container>
		</Navbar>
	);
}

export default Topbar;