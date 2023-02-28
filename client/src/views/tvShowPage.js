import 'bootstrap/dist/css/bootstrap.min.css';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import { db } from "../components/Firebase/firebase.js";
import { BASE_URL, key } from "../config/api.js";

function SubscribePage() {

	let tv_id = useParams();

	const [showData, setState] = useState({ name: "", poster_path: "", first_air_date: "", overview: "", stream: [] });

	const { name, poster_path, first_air_date, overview, stream } = showData;


	useEffect(() => {
		Promise.all([
			fetch(`${BASE_URL}tv/${tv_id.id}/watch/providers?api_key=${key}`)
				.then(res => res.json()),
			fetch(`${BASE_URL}tv/${tv_id.id}?api_key=${key}&language=en-US`)
				.then(res => res.json())
		]).then(([result1, result2]) => {
			console.log(result1.results.US.flatrate, result2);
			setState({
				name: result2.name,
				poster_path: result2.poster_path,
				first_air_date: result2.first_air_date.slice(0, 4),
				overview: result2.overview,
				stream: result1.results.US.flatrate
			});
		});
	}, []);

	const showList = collection(db, 'userList');

	const addToWatchList = () => {
		getDocs(showList).then(docs => {
			docs.forEach(doc => {
				console.log(doc.id, '=>', doc.data());
			});
		});

	};

	const selectTVShow = (e) => {
		console.log(e.target.value);
	};

	return (
		<Container className="p-3">

			<Container className="p-5 mb-4 show_page">

				<div className="poster-wrap">
					<img src={`https://image.tmdb.org/t/p/w300/${poster_path}`} alt=""/>

				</div>
				<div className="poster-description">
					<div className="header_poster">
						<div className="title">
							<h1>{name} ({first_air_date})</h1>
						</div>


						<div className="action">
							<div className="selectShow">
								<label htmlFor="pet-select">Choose Stream:</label>

								<Form.Select onChange={selectTVShow}>
									{stream.map((channel) =>
										<option
											key={channel.provider_id}
											value={channel.provider_id}

										>
											{channel.provider_name}
										</option>
									)}
								</Form.Select>
							</div>
						</div>

						<div>
							<button onClick={addToWatchList}>Add to your List</button>
						</div>


						<div className="header_info">
							<p>{overview}</p>
						</div>
					</div>

				</div>
			</Container>
		</Container>
	);
};

export default SubscribePage;
