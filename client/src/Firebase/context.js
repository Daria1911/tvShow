import React, { useContext, useEffect, useState, createContext } from 'react';
import { auth } from "./firebase.js";
import {
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signOut,
	onAuthStateChanged
} from "firebase/auth";


const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
	const [user, setUser] = useState({});

	function signUp(email, password)  {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	function logIn(email, password) {
		return signInWithEmailAndPassword(auth, email, password);

	}

	function signInWithGoogle () {
		const googleAuthProvider = new GoogleAuthProvider();
		return signInWithPopup(auth, googleAuthProvider);
	}



	function logOut () {
		return signOut(auth);
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentuser) => {

			console.log("Auth", currentuser);
			setUser(currentuser);
		});
		return(
			() => unsubscribe()
		)
	}, []);

	return (
		<userAuthContext.Provider value={{user,  signUp, logIn, logOut, signInWithGoogle}}>
			{children}
		</userAuthContext.Provider>
	);
}


export function useUserAuth() {
	return useContext(userAuthContext);
}