import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";


const ListOfShows = ({ shows }) => {
	return (
		<Container>
			<ul>
				{shows.map(show =>
					<div key={show.id} className="results">
						<div className="wrapper">
							<div className="image">
								<Link to={`/show/selected/${show.id}`}>
										<img src={`https://image.tmdb.org/t/p/w300/${show.poster_path}`} alt=""/>
								</Link>
							</div>
							<div xs={6} className="details">
								<div>
									<h3>
										{show.name}
									</h3>
									<span className="release_date">{show.first_air_date}</span>
								</div>
								<div className="overview">
									<p>{show.overview}</p>
								</div>
							</div>
						</div>
					</div>
				)}
			</ul>
		</Container>
	);
};


export default ListOfShows;