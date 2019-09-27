import React, {Component} from 'react';
import axios from "axios";

class SignUp extends Component {
	state = {
		users: [],
		userName: '',
		password: '',
		passwordCheck: '',
		formErrors: {userName: '', password: ''},
		passwordValid: '',
		formValid: '',
		UserError: '',
		PasswordErrorSpaces: '',
		PasswordErrorShort: '',
		PasswordErrorCheck: ''
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
			if ('object' === typeof res.data) {
				this.setState({
					userName: '',
					password: '',
					passwordCheck: ''
				});
			}

			switch (res.data) {
				case "it's User registered":
					this.setState({
						UserError: 'UserError'
					});
					setTimeout(() => {
						this.setState({
							UserError: ''
						});
					}, 3000);
					break;
				case 'Your password have spaces,please rewrite':
					this.setState({
						PasswordErrorSpaces: 'PasswordErrorSpaces'
					});
					setTimeout(() => {
						this.setState({
							PasswordErrorSpaces: ''
						});
					}, 3000);
					break;
				case 'Your password very short, you need have min 6 symbols':
					this.setState({
						PasswordErrorShort: 'PasswordErrorShort'
					});
					setTimeout(() => {
						this.setState({
							PasswordErrorShort: ''
						});
					}, 3000);
					break;

				case 'Your password  not match with field check password':

					this.setState({
						PasswordErrorCheck: 'PasswordErrorCheck'
					});
					console.log(this.state);
					setTimeout(() => {
						this.setState({
							PasswordErrorCheck: ''
						});
					}, 3000000);
					break;
				default:
			}

		})
			.catch(e => console.log(e));
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
					<div className={` error ${this.state.UserError}`}>it's User registered</div>
					<div className={` error ${this.state.PasswordErrorSpaces}`}>Your password have spaces,please rewrite</div>
					<div className={` error ${this.state.PasswordErrorShort}`}>Your password very short, you need have min 6 symbols</div>
					<div className={` error ${this.state.PasswordErrorCheck}`}>Your password  not match with field check password</div>
				</div>
			</div>
		)
	}
}

export default SignUp;
