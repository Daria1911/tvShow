import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from "./components/ProtectedRoute.js";
import { UserAuthContextProvider } from "./Firebase/context.js";
import MainPage from "./views/Landing/mainPage.js";
import LogIn from "./views/LogIn/logIn.js";
import SignUp from "./views/LogIn/signUp.js";
import Profile from "./views/ProfilePage/profile.js";
import TvShowIndexPage from "./views/TvShowPage/tvShowIndexPage.js";
import SubscribePage from "./views/TvShowPage/tvShowPage.js";


function App() {

	return (
		<UserAuthContextProvider>
			<Router>
				<Routes>
					<Route path="/" element={<MainPage/>}/>
					<Route path="/signup" element={<SignUp/>}/>
					<Route path="/login" element={<LogIn/>}/>
					<Route path="/show/:name" element={<TvShowIndexPage/>}/>
					<Route element={<ProtectedRoute/>}>
						<Route path="/user" element={<Profile/>}/>}/>

					</Route>
					<Route path="/show/selected/:id" element={< SubscribePage/>}/>
				</Routes>
			</Router>
		</UserAuthContextProvider>

	);
}

export default App;
