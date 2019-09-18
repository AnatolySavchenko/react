import React from 'react';

class ItemTodoList extends React.Component{
	render() {
		const {id,title,status,handleDeleteItem,changeState} = this.props;
		return(
				<li className='elementTodo' id={id}>
					<input data-todo={id} type='checkbox' onChange={changeState} checked={status}/>
					<span className='throughText'>{title}</span>
					<input id={id} type="text" className='edit' />
					<button type='button' data-todo={id} className='close button_delete' aria-label='Close' onClick={handleDeleteItem}><span aria-hidden='true'>&times;</span></button>
				</li>
		)
	}
}

export default ItemTodoList;
