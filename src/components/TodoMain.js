import React, {Component} from 'react';
import axios from 'axios';

import AddTodo from './addTodo';
import TodoList from './TodoList';
import CountItems from './CountItems';
import ButtonForActive from './ButtonForActive';



import {withRouter} from 'react-router';

class TodoMain extends Component {
	state = {
		todos: [],
		userName: '',
		modelTabs: 'All',
		classNameEdited: '',
		value: '',
		valueEdit: '',
		status: false
	};



	componentDidMount() {
		let userPath = this.props.history.location.pathname;
		let user = userPath.slice(6);

		axios.post(`http://localhost:5000/user/${user}/task`, {
			user
		})
			.then(res => {
				this.setState({
					todos: res.data,
					userName:user
				});
			})
			.catch(e => console.log(e));
	}

	handleChange = (e) => {
		this.setState({
			value: e.target.value
		});
	};

	handleSubmit = () => {
		const {
			value,
			classNameEdited,
			todos,
			userName,
			status,
		} = this.state;

		if (!value) {
			alert('Enter text!');
		} else {
			axios.put(`http://localhost:5000/user/${userName}`, {
				value,
				classNameEdited,
				userName,
				status
			}).then((res) => {
				const {status, _id, classNameEdited, value} = res.data;
				const newItem = {
					status,
					_id,
					classNameEdited,
					value,
				};
				this.setState({
					todos: [...todos, newItem],
					value: ''
				});
			});
		}
	};

	handleKeyPress = (e) => {
		if (e.charCode === 13) {
			e.preventDefault();
			this.handleSubmit();
		}
	};

	handleDeleteItem = (id) => {
		const {todos, userName} = this.state;

		todos.forEach((item) => {
			if (item._id === id) {
				axios.delete(`http://localhost:5000/user/${userName}/${id}`, {data: {id, userName, todos}})
					.then(res => {
						this.setState({
							todos: res.data
						});
					})
					.catch(e => console.log(e));
			}
		});
	};


	changeState = (id) => {
		const {todos, userName, classNameEdited} = this.state;
		todos.forEach((item, i) => {
			if (item._id === id) {
				item.status = !item.status;
				axios.put(`http://localhost:5000/user/${userName}/${id}`, {todos, userName, classNameEdited, i})
					.then((res) => {
						this.setState({
							todos: res.data
						});
					})
					.catch(e => console.log(e));
			}
		})
	};

	deleteCompleteItems = () => {
		const {userName, todos} = this.state;
		axios.delete(`http://localhost:5000/user/${userName}/task`, {data: {userName, todos}})
			.then((res) => {
				this.setState({
					todos: res.data
				})
			})
			.catch(e => console.log(e));
	};

	handleCheckAll = () => {
		const {todos, userName} = this.state;
		const bool = todos.every(item => item.status);
		console.log('--------bool', bool);
		axios.put(`http://localhost:5000/user/${userName}/task`, {data: !bool, todos, userName})
			.then((res) => {
				this.setState({
					todos: res.data
				});
			})
			.catch(e => console.log(e));
	};

	handleShowTabs = (tab) => {
		this.setState({
			modelTabs: tab
		})
	};


	onDblClick = (i) => {
		let {todos, valueEdit} = this.state;
		todos.forEach(item => {
			if (item._id === i) {
				item.classNameEdited = 'edited';
				valueEdit = item.value;
				this.setState({
					todos: todos,
					valueEdit: item.value
				});
			}
		});
	};

	onBlurHandler = () => {
		let {todos, valueEdit, userName} = this.state;
		todos.forEach((item, i) => {
			if (item.classNameEdited === 'edited') {
				item.value = valueEdit;
				axios.put(`http://localhost:5000/user/${userName}/${item._id}`, {todos, userName, i})
					.then((res) => {
						item.classNameEdited = '';
						this.setState({
							todos: res.data
						})
					})
					.catch(e => console.log(e));
			}
		})
	};


	onChangeElement = (e) => {
		this.setState({
			valueEdit: e.target.value
		});
	};


	render() {
		let userPath = this.props.history.location.pathname;
		let user = userPath.slice(6);
		let renderArray = [];
		switch (this.state.modelTabs) {
			case "All":
				renderArray = this.state.todos;
				break;
			case "Active":
				renderArray = this.state.todos.filter(item => !item.status);
				break;
			case "Completed":
				renderArray = this.state.todos.filter(item => item.status);
				break;
		}
		return (
			<div
				className='container'
				onBlur={this.onBlurHandler}
			>
				<h1
					className='caption_todo'
				>
					Welcome {user} ! It's your Todo List
				</h1>
				<AddTodo
					item={this.state.value}
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					handleKeyPress={this.handleKeyPress}
					handleCheckAll={this.handleCheckAll}
				/>
				<TodoList
					items={renderArray}
					handleDeleteItem={this.handleDeleteItem}
					changeState={this.changeState}
					onDblClick={this.onDblClick}
					onChangeElement={this.onChangeElement}
				/>
				<CountItems
					items={this.state.todos}
				/>
				<ButtonForActive
					deleteCompleteItems={this.deleteCompleteItems}
					handleShowTabs={this.handleShowTabs}
					items={this.state.todos}
				/>
			</div>
		)
	}
}


export default TodoMain;
