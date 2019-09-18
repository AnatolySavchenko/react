import React from 'react';
import ItemTodoList from "./ItemTodoList";

class TodoList extends React.Component{
	render(){
		const {
			items,
			handleDeleteItem,
			changeState,
			filterName
		} = this.props;

		return(
			<div className='for_views_todo'>
				<ul id='list-of-items'>
					{
						items.filter(item => {
							return <ItemTodoList key={item._id}
																	 id={item._id}
																	 title={item.value}
																	 status={item.status}
																	 handleDeleteItem = {() => handleDeleteItem(item._id)}
																	 changeState={() => changeState(item._id)} />
						})
					}
				</ul>
			</div>
		)
	}
}


export default TodoList;
