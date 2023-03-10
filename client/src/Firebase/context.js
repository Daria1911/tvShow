import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from "./firebase.js";


const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
	const [user, setUser] = useState({});

	function signUp(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	function logIn(email, password) {
		return signInWithEmailAndPassword(auth, email, password);

	}

	function signInWithGoogle() {
		const googleAuthProvider = new GoogleAuthProvider();
		return signInWithPopup(auth, googleAuthProvider);
	}


	function logOut() {
		return signOut(auth);
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
			setUser(currentuser);
		});
		return (
			() => unsubscribe()
		);
	}, []);

	return (
		<userAuthContext.Provider value={{ user, signUp, logIn, logOut, signInWithGoogle }}>
			{children}
		</userAuthContext.Provider>
	);
}


export function useUserAuth() {
	return useContext(userAuthContext);
}