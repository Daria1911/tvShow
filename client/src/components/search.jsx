import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";

function Search({ setTVShow }) {

	const [value, setValue] = useState("");
	const [source, setSource] = useState("");


	const addTVShow = (e) => {
		e.preventDefault();
		// fetch(`/store-data/show/${value}/service/${source}`, {
		// 	method: 'POST'
		// 	})
		// 	.then((response) => response.json())
		// 	.then(data => {
		// 		setTVShow(data)
		// 	});
	};

	return (
		<Form>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Row>
					<Col xs={6}>
						<Form.Control onChange={event => setValue(event.target.value)}
									  value={value}
									  type="text" placeholder="Enter TVShow"/>
					</Col>
				</Row>

			</Form.Group>

			<Button variant="primary" type="submit" onClick={addTVShow}>
				Submit
			</Button>
		</Form>
	);

}


export default Search;