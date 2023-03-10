import React from "react";
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useUserAuth } from "../../Firebase/context.js";
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function Topbar({ user}) {
	const navigate = useNavigate();

	const { logOut } = useUserAuth();

	const handleLogout = () => {
		logOut()
			.then(() => {
				navigate("/");
			})
			.catch(error => {
				console.log(error);
			});
	};


	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<Navbar.Brand href="/">Show</Navbar.Brand>

				{user ?
					<div>

						<DropdownButton id="dropdown-basic-button" title="Profile">
							<Dropdown.Item href="/user">Profile</Dropdown.Item>
							<Dropdown.Item href="/" onClick={handleLogout}>
								Log Out
							</Dropdown.Item>
						</DropdownButton>


					</div>:
					<Button>
						<Nav.Link href="/login" className="profileLink">
							Log In
						</Nav.Link>
					</Button>
				}
			</Container>
		</Navbar>
	);
}

export default Topbar;