import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
	apiKey: "AIzaSyAFGHTZEy2NMGih2yYIQ48GiMs3IFYv8A0",
	authDomain: "tvshow-362b4.firebaseapp.com",
	databaseURL: "https://tvshow-362b4-default-rtdb.firebaseio.com",
	projectId: "tvshow-362b4",
	storageBucket: "tvshow-362b4.appspot.com",
	messagingSenderId: "1008499379641",
	appId: "1:1008499379641:web:85e0e44b38ee2878803a68"

};


// export default getFirestore();
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();