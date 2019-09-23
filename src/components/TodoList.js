import React, {Component} from 'react';

import ItemTodoList from './ItemTodoList';

class TodoList extends Component {
	render() {
		const {
			items,
			handleDeleteItem,
			changeState,
			onDblClick,
			onChangeElement
		} = this.props;

		return (
			<div className="for_views_todo">
				<ul id="list-of-items">
					{
						items.map(item => {
							return <ItemTodoList
								key={`${item._id}${item.value}`}
								id={item._id}
								title={item.value}
								status={item.status}
								classNameEdited={item.classNameEdited}
								handleDeleteItem={() => handleDeleteItem(item._id)}
								changeState={() => changeState(item._id)}
								onDblClick={(evt) => onDblClick(item._id, evt)}
								onChangeElement={() => onChangeElement(item.value)}
							/>
						})
					}
				</ul>
			</div>
		)
	}
}


export default TodoList;
