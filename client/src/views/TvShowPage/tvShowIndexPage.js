import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Autocomplete from "../../components/Autocomplete/autocomplete.js";
import ListOfShows from "../../components/table.jsx";
import Topbar from "../../components/Topbar/Topbar.jsx";
import { BASE_URL, key } from "../../config/api.js";
import { useParams } from 'react-router-dom';
import { useUserAuth } from "../../Firebase/context.js";

function TvShowIndexPage() {

	let id = useParams();
	const { user } = useUserAuth();
	const [showList, setNewList] = useState([]);
	const [searchParam, setNewSearchParam] = useState(id.name);


	useEffect(() => {
		fetch(`${BASE_URL}search/tv?api_key=${key}&query=${searchParam}`)
			.then(res => res.json())
			.then(data => {
				console.log("TvShowIndexPage", data.results);
				setNewList(data.results);
			});
	}, [searchParam]);


	return (

		<div>
			<Topbar user={user} />

			<Container className="p-3">
				<Container >
					<div>
						<Autocomplete getParams={setNewSearchParam}/>
					</div>

				</Container>
				<Container className="p-5 mb-4 rounded-3">
					<ListOfShows shows={showList}/>
				</Container>
			</Container>
		</div>

	);
}

export default TvShowIndexPage;
