import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Autocomplete from "../../components/Autocomplete/autocomplete.js";
import ListOfShows from "../../components/table";
import Topbar from "../../components/Topbar/Topbar.jsx";
import { BASE_URL, key } from "../../config/api.js";
import { useUserAuth } from "../../Firebase/context.js";


function MainPage() {
	const { user } = useUserAuth();

	const [showList, setNewList] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		console.log("Effect", user);
		if(user){
			setLoading(false)
		}
		fetch(`${BASE_URL}/trending/tv/week?api_key=${key}`)
			.then(res => res.json())
			.then(data => {
				setNewList(data.results);
			});
	}, [user]);


	return (
		loading ? <div>Loading...</div> :
		<div>
			<Topbar user={user}/>
			<Container className="p-3">

				<Container className="p-5 mb-4 rounded-3">
					<div>
						<h1>
							Welcome.
							Find best stream service for you.<br/>
							Explore now.
						</h1>
					</div>


					<div>
						<Autocomplete />
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
