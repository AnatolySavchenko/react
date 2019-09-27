import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import TodoMain from './components/TodoMain';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import './App.css';
import Header from './components/Header';

class App extends Component {
	state = {
		userPage:''
	};

	updateData = (value) => {
		this.setState({ userPage: value })
	};

	render() {
		console.log('--------this.state', this.state);
		
		return (
			<BrowserRouter>
				<Header/>
				<Route exact path="/" component={TodoMain}  />
				<Route path="/logIn" render={()=><LogIn updateData={this.updateData} />} />
				<Route path="/signUp" component={SignUp}/>
			</BrowserRouter>
		)
	}
}


export default App;
