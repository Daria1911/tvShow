import { getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Autocomplete from "../../components/Autocomplete/autocomplete.js";
import Topbar from "../../components/Topbar/Topbar.jsx";
import { BASE_URL, key } from "../../config/api.js";
import { useUserAuth } from "../../Firebase/context.js";
import { userList } from "../../Firebase/firebase.js";

function Profile() {

	const [showList, setNewList] = useState([]);
	const [service, setMostCommonService] = useState([]);
	const { user } = useUserAuth();
	const [searchParam, setNewSearchParam] = useState("");
	const [loading, setLoading] = useState(true);


	useEffect(() => {
		if (Object.keys(user).length > 0) {
			setLoading(false);
			const q = query(userList, where("email", "==", user.email));
			let showIds = [];

			getDocs(q).then(docs => {
				docs.forEach(doc => {
					showIds.push(doc.data().show_id);
				});
				return showIds;
			}).then((showIds) => {

				const promise1 = showIds.map(id => {
					return fetch(`${BASE_URL}tv/${id}/watch/providers?api_key=${key}`)
						.then(res => res.json());
				});

				const promise2 = showIds.map(id => {
					return fetch(`${BASE_URL}tv/${id}?api_key=${key}&language=en-US`)
						.then(res => res.json());
				});

				const servicesMap = new Map();

				Promise.all(promise1)
					.then((promise1) => {
						promise1.forEach(show => {
							if (show.results.US.flatrate) {
								show.results.US.flatrate.forEach(stream => {
									if (servicesMap.has(stream.provider_name)) {
										servicesMap.set(stream.provider_name, servicesMap.get(stream.provider_name) + 1);
									} else {

										servicesMap.set(stream.provider_name, 1);
									}
								});
							}
						});

						let maxValue = 0;
						const result = Array.from(servicesMap)
							.map(([name, count]) => ({ name, count }));
						result.forEach(streamObj => {
							maxValue = streamObj.count > maxValue ? streamObj.count : maxValue;
						});

						let mostCommonServices =
							result.map(streamObj => {
								if (streamObj.count === maxValue) {
									return streamObj.name;
								}
							});

						setMostCommonService(mostCommonServices);
					});
				Promise.all(promise2).then(shows => setNewList(shows));
			});

		}
	}, [user]);

	return (
		!loading ?
			<div>
				<Topbar user={user}/>

				<Container className="p-3">

					<Row>
						<h2 className="header" style={{ padding: 50 + 'px' }}>
							Welcome Back. In your List {showList.length} show
						</h2>
					</Row>

					<Col className="autocomplete">
						<Autocomplete getParams={setNewSearchParam}/>
					</Col>

					<Row>

						<Col className="userListOfShow">
							{showList.map(show =>
								<div key={show.id}>
									<Link to={`/show/selected/${show.id}`}>
										<img src={`https://image.tmdb.org/t/p/w200${show.poster_path}`} alt=""/>
									</Link>

									<div>
										<p>
											Rating - {Math.floor(show.vote_average * 10)}%
										</p></div>
								</div>
							)}

						</Col>
						<Col xs={4}>
							<div>
								<h2>Best Stream for you: </h2>
								{service.map((elem, i) => <div key={i}>{elem}</div>)}
							</div>
						</Col>

					</Row>


				</Container>
			</div>
			: <div>Loading...</div>

	);
}

export default Profile;