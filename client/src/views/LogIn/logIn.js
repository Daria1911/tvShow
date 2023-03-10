import React, { useState } from "react";
import { Col } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import GoogleButton from 'react-google-button';
import { Link, useNavigate } from "react-router-dom";
import Topbar from "../../components/Topbar/Topbar.jsx";
import { useUserAuth } from "../../Firebase/context.js";

function LogIn() {


	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const {user, logIn, signInWithGoogle } = useUserAuth();
	const navigate = useNavigate();


	const handleSubmit = (e) => {
		e.preventDefault();
		setError("");
		logIn(email, password)
			.then((result) => {
				if(result){
					navigate("/user");
				}

			})
			.catch(error => {
				console.log(error);
				setError(error.message);
			});
	};

	const handleGoogleSignIn = () => {
		signInWithGoogle()
			.then((result) => {

				if(result){
					navigate("/user");
				}
			})
			.catch(error => {
				setError(error.message);
			});
	};
	return (
		<div>
			<Topbar user={user} />

			<Container className="p-4 box">
				<Row className="justify-content-md-center">
					{error && <Alert variant="danger">{error}</Alert>}

					<Form>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" placeholder="Enter email"
										  value={email}
										  onChange={(e) => setEmail(e.target.value)}
							/>
							<Form.Text className="text-muted">
								We'll never share your email with anyone else.
							</Form.Text>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password"
										  value={password}
										  onChange={(e) => setPassword(e.target.value)}/>
						</Form.Group>

						<Row className="authentication">
							<Col  md="auto" className="authenticationButton">
								<Button variant="primary" onClick={handleSubmit}>
									Sign In
								</Button>

							</Col>
							<Col  md="auto">
								<GoogleButton onClick={handleGoogleSignIn}/>
							</Col>

							<p> Don't have an account <Link to="/signup">Sign Up</Link></p>

						</Row>
					</Form>
				</Row>
			</Container>
		</div>

	);
}


export default LogIn;