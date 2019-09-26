import React, {Component} from 'react';
import axios from "axios";

class SignUp extends Component {
	state = {
		users: [],
		userName: '',
		password: '',
		passwordCheck: '',
		formErrors: {userName: '',password: ''},
		passwordValid:'',
		formValid:''
	};

	changeInputName = (e) => {
		this.setState({
			userName: e.target.value
		})
	};

	changeInputPassword = (e) => {
		this.setState({
			password: e.target.value
		})

	};

	changeInputPasswordCheck = (e) => {
		this.setState({
			passwordCheck: e.target.value
		})
	};

	SigInSubmit = () => {
		const {
			userName,
			password,
			passwordCheck,
			users
		} = this.state;


		axios.post(`http://localhost:5000/user/signIn/`, {
			userName,
			password,
			passwordCheck
		}).then((res) => {
			console.log('--------res', res);
			
			this.setState({
				userName: '',
				password: '',
				passwordCheck: ''
			});
		});

	};


	render() {
		const {
			userName,
			password,
			passwordCheck
		} = this.state;

		return (
			<div className="backgroundForSign">
				<div className="container">
					<form className="forForm">
						<h3 className="for_sign">
							Sign up
						</h3>
						<div>
							<input
								className="forEmail"
								type="text"
								placeholder="User Name"
								onChange={this.changeInputName}
								value={userName}
							/>
						</div>
						<div>
							<input
								className="forPassword"
								type="password"
								placeholder="Set A Password"
								onChange={this.changeInputPassword}
								value={password}
							/>
						</div>
						<div>
							<input
								className="forRepeatPassword"
								type="password"
								placeholder="Repeat Password"
								onChange={this.changeInputPasswordCheck}
								value={passwordCheck}
							/>
						</div>
						<button
							className="forSubmit"
							type="button"
							onClick={this.SigInSubmit}
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		)
	}
}

export default SignUp;
