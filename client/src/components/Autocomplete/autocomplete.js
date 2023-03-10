import React, { useRef, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { BASE_URL, key } from "../../config/api.js";
import useOutsideClick from "../../config/useOutsideClick.js";
import './Autocomplete.css';

const Autocomplete = ({ getParams }) => {

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
		setDisplay(false);
		getParams(tvShow);
	};

	const ref = useRef();

	useOutsideClick(ref, () => {
		setDisplay(false);
	});


	return (
		<Container className="inputSearch" ref={ref}>
			<Row className="">
				<Form.Control
					id="auto"
					placeholder="Type to search"
					value={search}
					onChange={(event) => setSearch(event.target.value)}
					onKeyUp={getAutoCompeteData}
				/>

			</Row>
			<Row>
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
			</Row>
		</Container>
	);
};

export default Autocomplete;