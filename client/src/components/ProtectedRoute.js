import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserAuth } from "../Firebase/context.js";

const ProtectedRoute = () => {
	let {user} = useUserAuth();
	return 	user ? <Outlet/> : <Navigate to="/login"/>

};

export default ProtectedRoute;
