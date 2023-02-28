import React, { useState } from "react";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { BASE_URL, key } from "../config/api.js";

const Autocomplete = () => {
	const [display, setDisplay] = useState(false);
	const [options, setOptions] = useState([]);
	const [search, setSearch] = useState("");


	const getAutoCompeteData = () => {

		if (!search) {
			setDisplay(false);
		} else {
			fetch(`${BASE_URL}search/tv?api_key=${key}&language=en-US&query=${search}`)
				.then(res => res.json())
				.then(data => {
					if (data.results) {
						setDisplay(true);
						setOptions(data.results);
					}
				});
		}
	};

	const selectShow = (tvShow) => {
		setSearch(tvShow);
	};

	return (
		<div className="flex-container flex-column pos-rel">
			<Row>
				<Col xs={6}>
					<Form.Control
						id="auto"
						placeholder="Type to search"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						onKeyUp={getAutoCompeteData}
					/>

				</Col>
			</Row>

			{display && (
				<div className="autoContainer">

					{options
						.map((tvShow) => {
							return (
								<Link to={`/show/${tvShow.name}`} key={tvShow.id}>
									<div onClick={() => selectShow(tvShow.name)}>
										<span>{tvShow.name}</span>
									</div>
								</Link>


							);
						})}
				</div>
			)}

		</div>
	);
};

export default Autocomplete;