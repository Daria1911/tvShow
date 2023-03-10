import 'bootstrap/dist/css/bootstrap.min.css';
import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import Topbar from "../../components/Topbar/Topbar.jsx";
import { BASE_URL, key } from "../../config/api.js";
import { useUserAuth } from "../../Firebase/context.js";
import { db } from "../../Firebase/firebase.js";

function SubscribePage() {

	let tv_id = useParams();

	const [showData, setState] = useState({
		name: "",
		poster_path: "",
		first_air_date: "",
		overview: "",
		id: "",
		stream: []
	});

	const { name, poster_path, first_air_date, overview, id, stream } = showData;
	const [status, handleWatchList] = useState(false);
	const { user } = useUserAuth();

	useEffect(() => {
		Promise.all([
			fetch(`${BASE_URL}tv/${tv_id.id}/watch/providers?api_key=${key}`)
				.then(res => res.json()),
			fetch(`${BASE_URL}tv/${tv_id.id}?api_key=${key}&language=en-US`)
				.then(res => res.json())
		]).then(([result1, result2]) => {

			let url = `https://image.tmdb.org/t/p/w300${result2.poster_path}`;


			setState({
				name: result2.name,
				poster_path: url,
				first_air_date: result2.first_air_date.slice(0, 4),
				overview: result2.overview,
				stream: result1.results ? result1.results.US.flatrate : [],
				id: result2.id
			});
		});
	}, []);

	const showList = collection(db, 'userList');

	const addToWatchList = () => {
		const data = {
			email: user ? user.email : null,
			show_id: id,
			poster: poster_path
		};

		addDoc(showList, data)
			.then(docRef => {
				if (docRef) {
					handleWatchList(true);
				}
			})
			.catch(error => {
				console.log(error);
			});
	};

	return (

		<div>
			<Topbar user={user}/>

			<Container className="p-3">

				<Container className="p-5 mb-4 show_page">

					<div className="poster-wrap">
						<img src={poster_path} alt=""/>

					</div>
					<div className="poster-description">
						<div className="header_poster">
							<div className="title">
								<h1>{name} ({first_air_date})</h1>
							</div>


							{/*<div className="action">*/}
							{/*<div className="selectShow">*/}
							{/*<label htmlFor="pet-select">Stream:</label>*/}

							{/*</div>*/}
							{/*</div>*/}

							<div>
								{!status ?
									<Button variant="outline-primary" onClick={addToWatchList}>
										Add to List
									</Button> :
									<Button variant="success">Remove from your list</Button>
								}

							</div>


							<div className="header_info">
								<p>{overview}</p>
							</div>
						</div>

					</div>
				</Container>
			</Container>
		</div>

	);
};

export default SubscribePage;
