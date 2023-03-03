import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Autocomplete from "../../components/autocomplete.js";
import ListOfShows from "../../components/table";
import Topbar from "../../components/Topbar/Topbar.jsx";
import { BASE_URL, key } from "../../config/api.js";
import { useUserAuth } from "../../Firebase/context.js";


function MainPage() {
	const {  user } = useUserAuth();

	const [showList, setNewList] = useState([]);
	console.log("-----------------------", user);

	useEffect(() => {
		fetch(`${BASE_URL}/tv/popular?api_key=${key}&language=en-US&page=1`)
			.then(res => res.json())
			.then(data => {
				console.log(data);
				setNewList(data.results);
			});
	}, []);


	return (

		<div>
			<Topbar user={user}/>
			<Container className="p-3">

				<Container className="p-5 mb-4 rounded-3">
					<div>
						<Autocomplete getShows={setNewList}/>
					</div>

				</Container>
				<Container className="p-5 mb-4 rounded-3">
					<ListOfShows shows={showList}/>
				</Container>
			</Container>
		</div>

	);
}

export default MainPage;
