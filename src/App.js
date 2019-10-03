import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';

import TodoMain from './components/TodoMain';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Header from './components/Header';


class App extends Component {

	render() {
		return (
			<BrowserRouter>
				<Header/>
				<Route exact path="/user:name" component={TodoMain}/>
				<Route path="/logIn" component={LogIn}/>
				<Route path="/signUp" component={SignUp}/>
			</BrowserRouter>
		)
	}
}


export default App;
