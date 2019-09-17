import React from 'react';
import AddTodo from "./addTodo/addTodo";
import './App.css';

class App extends React.Component{

  constructor(props){
    super();
    this.state = {
      todos: []
    }
  }

  render(){
    return(
  <div className='container'>
    <h1 className='caption_todo'>todos</h1>
    <AddTodo addTodoFn={this.addTodo}></AddTodo>
  </div>
    )
  }

  addTodo = (todoElement) => {
    let arrayTodos = this.state.todos;
    arrayTodos.push(todoElement);
    this.setState({arrayTodos});
    console.log(arrayTodos);
  };


}


export default App;
