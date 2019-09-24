import React, {Component} from 'react';

class ItemTodoList extends Component{
	render() {
		const {
			id,
			title,
			status,
			classNameEdited,
			handleDeleteItem,
			changeState,
			onDblClick,
			onChangeElement
		} = this.props;
		return(
				<li className={'elementTodo' + ' ' + classNameEdited} id={id}>
					<input data-todo={id} type="checkbox" onChange={changeState} checked={status}/>
					<span className="throughText" onDoubleClick={onDblClick}>{title}</span>
					<input id={id} type="text" className="edit" onChange={onChangeElement}/>
					<button type="button" data-todo={id} className="close button_delete" aria-label="Close" onClick={handleDeleteItem}><span aria-hidden="true">&times;</span></button>
				</li>
		)
	}
}

export default ItemTodoList;
