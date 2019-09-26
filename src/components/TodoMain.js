import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import axios from 'axios';

import AddTodo from './addTodo';
import TodoList from './TodoList';
import CountItems from './CountItems';
import ButtonForActive from './ButtonForActive';



class TodoMain extends Component {
	state = {
		todos: [],
		modelTabs: 'All',
		classNameEdited: '',
		value: '',
		valueEdit: '',
		status: false
	};


	componentDidMount() {
		axios.get(`http://localhost:5000/todo/`)
			.then(res => {
				this.setState({
					todos: res.data
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
			todos
		} = this.state;

		if (!value) {
			alert('Enter text!');
		} else {
			axios.post(`http://localhost:5000/todo/`, {
				value,
				classNameEdited,
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
		const {todos} = this.state;
		todos.forEach((item, i) => {
			if (item._id === id) {
				axios.delete(`http://localhost:5000/todo/${item._id}`, {data: todos[i]})
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
		const {todos} = this.state;
		todos.forEach((item, i) => {
			if (item._id === id) {
				item.status = !item.status;
				axios.put(`http://localhost:5000/todo/${item._id}`, todos[i])
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
		axios.delete('http://localhost:5000/todo')
			.then((res) => {
				this.setState({
					todos: res.data.filter(item => !item.status)
				})
			})
			.catch(e => console.log(e));
	};

	handleCheckAll = () => {
		const {todos} = this.state;
		const bool = todos.every(item => item.status);

		axios.put('http://localhost:5000/todo', {data: !bool})
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
		let {todos, valueEdit} = this.state;
		todos.forEach((item, i) => {
			if (item.classNameEdited === 'edited') {
				item.value = valueEdit;
				axios.put(`http://localhost:5000/todo/${item._id}`, todos[i])
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
							todos
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
