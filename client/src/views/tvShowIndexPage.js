import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Autocomplete from "../components/autocomplete.js";
import ListOfShows from "../components/table.jsx";
import { BASE_URL, key } from "../config/api.js";
import { useParams } from 'react-router-dom';

function TvShowIndexPage() {

	let id = useParams();

	const [showList, setNewList] = useState([]);

	useEffect(() => {
		fetch(`${BASE_URL}search/tv?api_key=${key}&query=${id.name}`)
			.then(res => res.json())
			.then(data => {
				console.log(data.results)
				setNewList(data.results);
			});
	}, []);


	return (
		<Container className="p-3">
			<Container className="p-5 mb-4 bg-light rounded-3">
				<div>
					<Autocomplete getShows={setNewList}/>
				</div>

			</Container>
			<Container className="p-5 mb-4 rounded-3">
				<ListOfShows shows={showList}/>
			</Container>
		</Container>
	);
}

export default TvShowIndexPage;
