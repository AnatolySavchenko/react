import React, {Component} from 'react';

class LogIn extends Component {
	render() {
		return (
			<div className="backgroundForLog">
				<div className="container">
					<form className="forForm" method="post" action="form.php">
						<h3 className='for_log'>Log In</h3>
						<div>
							<input className="forEmail" type="email" placeholder="Email Address" required/>
						</div>
						<div>
							<input className="forPassword" type="password" placeholder="Set A Password" required></input>
						</div>
						<button className="forSubmit" type="submit">Submit</button>
					</form>
				</div>
			</div>
		)
	}
}

export default LogIn;
