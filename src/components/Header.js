import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class Header extends Component {
	render() {
		return (
			<div className="for_header">
				<NavLink to="/">todolist</NavLink>
				<NavLink to="/logIn">Log in</NavLink>
				<NavLink to="/signUp">Sign up</NavLink>
			</div>
		)
	}
}

export default Header;
