import React, {Component} from 'react';

import axios from 'axios';
import {withRouter} from 'react-router';

class LogIn extends Component {
	state = {
		users: [],
		userName: '',
		password: '',
		UserErrorLog: '',
		PasswordNotCorrect: '',
		userPage: ''
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

	LogInSubmit = () => {
		const {userName, password} = this.state;

		axios.post(`http://localhost:5000/user/logIn/`, {
			userName,
			password
		})
			.then(res => {
				switch (res.data) {
					case "Not find User":
						this.setState({
							UserErrorLog: 'UserErrorLog'
						});
						setTimeout(() => {
							this.setState({
								UserErrorLog: ''
							});
						}, 3000);
						break;
					case 'Not correct password':
						this.setState({
							PasswordNotCorrect: 'PasswordNotCorrect'
						});
						setTimeout(() => {
							this.setState({
								PasswordNotCorrect: ''
							});
						}, 3000);
						break;
					default:
				}
				let stringUserName = res.data;
				if (String(stringUserName) === this.state.userName) {
					this.setState({
						userPage: this.state.userName,
						userName: '',
						password: ''
					});

					this.props.history.push(`/user:${this.state.userPage}`);

				}
			})
			.catch(e => console.log(e));
	};

	render() {
		const {
			userName,
			password
		} = this.state;

		return (
			<div
				className="backgroundForLog"
			>
				<div
					className="container"
				>
					<form
						className="forForm"
					>
						<h3
							className='for_log'
						>
							Log In
						</h3>
						<div>
							<input
								className="forEmail"
								type="text"
								placeholder="User Name"
								onChange={this.changeInputName}
								value={userName}
								required
							/>
						</div>
						<div>
							<input
								className="forPassword"
								type="password"
								placeholder="Set A Password"
								onChange={this.changeInputPassword}
								value={password}
								required/>
						</div>
						<button
							className="forSubmit"
							type="button"
							onClick={this.LogInSubmit}
						>
							Submit
						</button>
					</form>
					<div
						className={` error ${this.state.UserErrorLog}`}
					>
						Not find User
					</div>
					<div
						className={` error ${this.state.PasswordNotCorrect}`}
					>
						Not correct password
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(LogIn);
