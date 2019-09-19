import React from 'react';
import AddTodo from "./components/addTodo";
import TodoList from "./components/TodoList";
import CountItems from "./components/CountItems";
import './App.css';
import ButtonForActive from "./components/ButtonForActive";
import axios from 'axios';

class App extends React.Component{
    state = {
      todos: [],
      modelTabs: 'All',
      classNameEdited: '',
      value: '',
      _id: Date.now(),
      status: false
    };


  componentDidMount() {
    axios.get(`http://localhost:5000/todo/`)
      .then(res => {
        console.log(res.data);
        const test= res.data;
        this.setState({
          todos:test
        });
      })
  }

    handleChange = (e) => {
      this.setState({
        value: e.target.value
      });

    };

  handleSubmit = () => {
        const newItem =  {
          _id: this.state._id,
          value:this.state.value,
          status:this.state.status,
          classNameEdited:this.state.classNameEdited
        };

        let updateItems = [...this.state.todos,newItem];

        if(this.state.value === ''){
          alert('Enter text!');
        }else{
          axios.post(`http://localhost:5000/todo/`,{
            value:newItem.value,
            classNameEdited:newItem.classNameEdited
          });
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
    axios.delete('http://localhost:5000/todo', {data:arrayAfterCheckedAndDelete})
      .then(res => console.log(res))
      .catch( e => console.log(e));
    this.setState({
      todos:arrayAfterCheckedAndDelete
    })
  };

  handleDeleteItem = (id) => {
    let arrayForSendDeleteElement = this.state.todos;

    let arrayAfterDeleteOneElement = this.state.todos.filter(item => item._id !== id);

    arrayForSendDeleteElement.forEach((item, i) => {
      if (item._id === id) {
        console.log(item);
        axios.delete(`http://localhost:5000/todo/${item._id}`, {data:arrayForSendDeleteElement[i]})
          .then(res => console.log(res))
          .catch( e => console.log(e));
      }
    });

    this.setState({
      todos: arrayAfterDeleteOneElement
    });
  };

  handleCheckAll = () => {
    let bool;
    let arrayCheckall = this.state.todos;
    if (arrayCheckall.every(item => item.status)) {
      arrayCheckall.forEach(item => item.status = false);
      bool = false
    } else if ((arrayCheckall.every(item => item.status)) === false) {
      arrayCheckall.forEach(item => item.status = true);
      bool = true
    }
    axios.put('http://localhost:5000/todo', {data:bool})
      .then(res => console.log(res))
      .catch(e => console.log(e));
    
    this.setState({
      todos:arrayCheckall
    });
  };

  changeState = (id) => {
    let arrayCheck = this.state.todos;
    arrayCheck.forEach((item,i) => {
      if(item._id === id) item.status = !item.status;
      axios.put(`http://localhost:5000/todo/${item._id}`, arrayCheck[i])
        .then(res => res.status)
        .catch(e => console.log(e));
    });
    this.setState({
      todos:arrayCheck
    })
  };

  handleShowTabs = (tab) => {
    this.setState({
      modelTabs:tab
    })
  };


  onDblClick = (i, evt) => {
    const currEl = evt.target;
    const textFromCurrEl = currEl.innerHTML;
    const activeInput = document.getElementById(`${i}`);

    console.log('--------activeInput', activeInput);
    

    let arrayforEdit =  this.state.todos;

    arrayforEdit.forEach(item => {
      if(item._id === i){
        item.classNameEdited = 'edited';
      }
      this.setState({
        todos:arrayforEdit
      })
    });

  };

  onChangeElement = (e) => {
console.log(e);
 /*
    let arrayforEdit =  this.state.todos;

    this.setState({
      value: e.value
    });

    arrayforEdit.forEach(item => {
      if(item.classNameEdited === 'edited'){
        item.value = this.state.value;
      }
    });
    this.setState({
      todos:arrayforEdit
    })
 
  */
  };

  onBlurHandler = (e) => {
     let arrayforEdit =  this.state.todos;
    arrayforEdit.forEach(item => {
      if(item.classNameEdited === 'edited'){
        item.classNameEdited = '';
      }
      this.setState({
        todos:arrayforEdit
      })
    });
  };

  render(){
    let renderArray = [];
    switch(this.state.modelTabs){
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
    return(
  <div className='container' onBlur={() => this.onBlurHandler()}>
    <h1 className='caption_todo'>todos</h1>
    <AddTodo item={this.state.value}
             handleChange={this.handleChange}
             handleSubmit={this.handleSubmit}
             handleKeyPress={this.handleKeyPress}
             handleCheckAll={this.handleCheckAll} />
    <TodoList  items={renderArray}
               handleDeleteItem={this.handleDeleteItem}
               changeState={this.changeState}
               onDblClick={this.onDblClick}
               onChangeElement={this.onChangeElement}
    />
    <CountItems items={this.state.todos} />
    <ButtonForActive deleteCompleteItems={this.deleteCompleteItems}
                     handleShowTabs={this.handleShowTabs}
                     items={this.state.todos}
    />
  </div>
    )
  }
}


export default App;
