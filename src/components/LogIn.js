import React, {Component} from 'react';
import axios from "axios";

class LogIn extends Component {
	state = {
		users: [],
		userName: '',
		password: '',
		UserErrorLog: '',
		PasswordNotCorrect: '',
		userPage:'test'
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
				if (res.data === userName) {
					switch (res.data) {
						case "Not find User":
							this.setState({
								UserErrorLog: 'UserErrorLog'
							});
							console.log(this.state);
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
				}else{
					// this.setState({
					// 	userPage:userName
					// })
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
			<div className="backgroundForLog">
				<div className="container">
					<form className="forForm">
						<h3 className='for_log'>Log In</h3>
						<div>
							<input
								className="forEmail"
								type="text"
								placeholder="Email Address"
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
								onChange={this.changeInputPassword} value={password} required/>
						</div>
						<button
							className="forSubmit"
							type="button"
							onClick={this.LogInSubmit}
						>
							Submit
						</button>
					</form>
					<div className={` error ${this.state.UserErrorLog}`}>Not find User</div>
					<div className={` error ${this.state.PasswordNotCorrect}`}>Not correct password</div>
					<button onClick={() => { this.props.updateData(this.state.userPage)}}>test</button>
				</div>
			</div>
		)
	}
}

export default LogIn;
