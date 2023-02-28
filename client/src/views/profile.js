import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import React, { useEffect, useState } from 'react';
import Autocomplete from "../components/autocomplete.js";
import ListOfShows from "../components/table.jsx";

function Profile() {

	const [showList, setNewList] = useState([]);
	const [service, setMostCommonService] = useState('');

	useEffect(() => {
		fetch('/getlist/userData')
			.then(res => res.json())
			.then(data => {
				setNewList(data.userList);
				setMostCommonService(data.mostCommonValue)
			});
	}, []);

	return (
		<Container className="p-3">
			<Container className="p-5 mb-4  rounded-3">
				<h1 className="header">Welcome Back</h1>
				<Row>
					<Col xs={6}>
						<Autocomplete getShows = {setNewList} getBestServiceUpdated = {setMostCommonService}/>
					</Col>
					<Col xs={6}>
						<div >
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