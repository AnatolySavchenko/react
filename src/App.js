import React, {Component} from 'react';
import axios from 'axios';

import AddTodo from './components/addTodo';
import TodoList from './components/TodoList';
import CountItems from './components/CountItems';
import ButtonForActive from './components/ButtonForActive';

import './App.css';

class App extends Component {
	state = {
		todos: [],
		modelTabs: 'All',
		classNameEdited: '',
		value: '',
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
		const { value, classNameEdited , todos} = this.state;

		if (!value) {
		  alert('Enter text!');
		} else {
			axios.post(`http://localhost:5000/todo/`, {
				value,
				classNameEdited,
			}).then((res) => {
			  const { status , _id , classNameEdited , value } = res.data;
        const newItem = {
          status,
          _id,
          classNameEdited,
          value,
        };
        this.setState({
          todos: [...todos,newItem],
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
            let arrayAfterDeleteOneElement = res.data;
            this.setState({
              todos: arrayAfterDeleteOneElement
            });
          })
          .catch(e => console.log(e));
      }
    });
  };


  changeState = (id) => {
    const { todos } = this.state;
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
        let arrayAfterCheckedAndDelete =  res.filter(item => !item.status);
        this.setState({
          todos: arrayAfterCheckedAndDelete
        })
      })
			.catch(e => console.log(e));
	};

	handleCheckAll = () => {
		const {todos} = this.state;
		const bool = todos.every(item => item.status);

		axios.put('http://localhost:5000/todo', {data: !bool})
			.then((res) => {
        const arrayCheckAll = res.data;
        if (bool) {
          arrayCheckAll.forEach(item => item.status = false);
        } else {
          arrayCheckAll.forEach(item => item.status = true);
        }
        this.setState({
          todos: arrayCheckAll
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
		let arrayforEdit = this.state.todos;

		arrayforEdit.forEach(item => {
			if (item._id === i) {
				item.classNameEdited = 'edited';
			}
			this.setState({
				todos: arrayforEdit
			})
		});

	};

	onChangeElement = (e) => {
		console.log(e);
	};

	/*
	onBlurHandler = (e) => {
		let { arrayForEdit } = this.state.todos;

    arrayForEdit.forEach(item => {
			if (item.classNameEdited === 'edited') {
				item.classNameEdited = '';
			}
			this.setState({
				todos: arrayForEdit
			})
		});
	};
	 */

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
			<div className='container'>
				<h1 className='caption_todo'>todos</h1>
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
				<CountItems items={this.state.todos}/>
				<ButtonForActive
					deleteCompleteItems={this.deleteCompleteItems}
					handleShowTabs={this.handleShowTabs}
					items={this.state.todos}
				/>
			</div>
		)
	}
}


export default App;
