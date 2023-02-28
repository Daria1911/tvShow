import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import MainPage from "./views/mainPage.js";
import TvShowIndexPage from "./views/tvShowIndexPage.js";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SubscribePage from "./views/tvShowPage.js";

function App() {

	return (
		<Router>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/show/:name" element={<TvShowIndexPage />} />
				<Route path="/show/selected/:id" element={< SubscribePage/>} />
			</Routes>
		</Router>
	);
}

export default App;
