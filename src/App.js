import React from 'react';
import AddTodo from "./components/addTodo";
import TodoList from "./components/TodoList";
import CountItems from "./components/CountItems";
import './App.css';
import ButtonForActive from "./components/ButtonForActive";

class App extends React.Component{
    state = {
      todos: [],
      value:'',
      _id:Date.now(),
      status: false,
      filterName: 'all'
    };

    handleChange = (e) => {
      this.setState({
        value: e.target.value
      });

    };

  handleSubmit = () => {
        const newItem =  {
          _id: this.state._id,
          value:this.state.value,
          status:this.state.status
        };

        const updateItems = [...this.state.todos,newItem];
        console.log('--------updateItems', updateItems);
        
        if(this.state.value === ''){
          alert('Enter text!');
        }else{
          this.setState({
            todos:updateItems,
            value:'',
            _id:Date.now(),
            status:false
          });
        }
    };

  handleKeyPress = (e) => {
    if(e.charCode === 13){
      e.preventDefault();
      this.handleSubmit();
    }
  };

  deleteCompleteItems = () => {
    let arrayAfterCheckedAndDelete = this.state.todos.filter(item => item.status === false);
    this.setState({
      todos:arrayAfterCheckedAndDelete
    })
  };

  handleDeleteItem = (id) => {
    let arrayAfterDeleteOneElement = this.state.todos.filter(item => item._id !== id);
    this.setState({
      todos: arrayAfterDeleteOneElement
    });
  };

  handleCheckAll = () => {
    let arrayCheckall = this.state.todos;
    if (arrayCheckall.every(item => item.status)) {
      arrayCheckall.forEach(item => item.status = false);
    } else if ((arrayCheckall.every(item => item.status)) === false) {
      arrayCheckall.forEach(item => item.status = true);
    }
    
    this.setState({
      todos:arrayCheckall
    });
  };

  changeState = (id) => {
    let arrayCheck = this.state.todos;
    arrayCheck.forEach(item => {
      if(item._id === id) item.status = !item.status;
    });
    this.setState({
      todos:arrayCheck
    })
  };

  handleAll = (arrAll) => {
    let renderAll =  arrAll;
    console.log('--------renderAll', renderAll);
  };

  handleActive = (arrActive) => {
    let renderActive = arrActive.filter(item => item.status === false);
    console.log('--------renderActive', renderActive);
  };

  handleCompleted = (arrCompleted) => {
  let renderComplited = arrCompleted.filter(item => item.status === true);
    console.log('--------renderComplited', renderComplited);
  };

  render(){
    const {
      filterName
    } = this.state;

    return(
  <div className='container'>
    <h1 className='caption_todo'>todos</h1>
    <AddTodo item={this.state.value}
             handleChange={this.handleChange}
             handleSubmit={this.handleSubmit}
             handleKeyPress={this.handleKeyPress}
             handleCheckAll={this.handleCheckAll} />
    <TodoList  items={this.state.todos}
               handleDeleteItem={this.handleDeleteItem}
               changeState={this.changeState}
               filterName={filterName}/>
    <CountItems items={this.state.todos} />
    <ButtonForActive deleteCompleteItems={this.deleteCompleteItems}
                     handleAll={this.handleAll}
                     handleActive={this.handleActive}
                     handleCompleted={this.handleCompleted}
                     items={this.state.todos}
    />
  </div>
    )
  }
}


export default App;
