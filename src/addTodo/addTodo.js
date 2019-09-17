import React from 'react';

class AddTodo extends React.Component{

	constructor(props){
		super();
		this.state = {
			itemTodo: ''
		}
	}

	render(){
		return(
			<div className="forInputAndButton">
				<input type='text' className="style-for-input" placeholder="enter todo" onChange={(e) => this.updateInput(e)}></input>
				<input type='button' className="style-for-input" value="add" onClick={(e) => this.addItem(e)}></input>
				<input type='button' className="style-for-input" value="check All"></input>
			</div>
		)
	}

	updateInput = (e) => {
		this.setState({itemTodo: e.target.value});
	};

	addItem = (e) => {
		e.preventDefault();
		this.props.addTodoFn(this.state.itemTodo);
	}

}


export default AddTodo;
