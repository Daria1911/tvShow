import React, { useEffect, useState } from 'react';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Autocomplete from "../../components/autocomplete.js";
import ListOfShows from "../../components/table.jsx";
import { useUserAuth } from "../../Firebase/context.js";
import { useNavigate } from "react-router-dom";

function Profile() {

	const [showList, setNewList] = useState([]);
	const [service, setMostCommonService] = useState('');
	const { logOut, user } = useUserAuth();
	const navigate = useNavigate();

	console.log("-----------------------", user);

	const handleLogout = () => {
		logOut()
			.then(() => {
				navigate("/");
			})
			.catch(error => {
				console.log(error);
			});
	};


	useEffect(() => {

		fetch('/getlist/userData')
			.then(res => res.json())
			.then(data => {
				setNewList(data.userList);
				setMostCommonService(data.mostCommonValue);
			});
	}, []);

	return (
		<Container className="p-3">
			<div className="d-grid gap-2">
				<Button variant="primary" onClick={handleLogout}>
					Log out
				</Button>
			</div>
			<Container className="p-5 mb-4  rounded-3">
				<h1 className="header">Welcome Back</h1>
				<Row>
					<Col xs={6}>
						<Autocomplete getShows={setNewList} getBestServiceUpdated={setMostCommonService}/>
					</Col>
					<Col xs={6}>
						<div>
							<h2>Best for you: {service}</h2>
						</div>
					</Col>
				</Row>
			</Container>
			<Container className="p-5 mb-4 rounded-3">
				<ListOfShows shows={showList}/>
			</Container>

		</Container>
	);
}

export default Profile;