import React, {Component, createRef} from 'react';

class ItemTodoList extends Component {

	state = {
		isEdited: false
	};

	inputEdit = createRef();


	componentDidUpdate(prevProps, prevState) {
		if (this.props.classNameEdited && !prevProps.classNameEdited) {
			this.setState({isEdited: true});
		}
		if (this.inputEdit.current) {
			if(this.props.classNameEdited !== prevProps.classNameEdited){
				this.setState({isEdited: false});
			}else {
			this.inputEdit.current.focus();
		}
	}
}


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

		const {isEdited} = this.state;



		if (isEdited) {
			return (
				<li
					className={`elementTodo  ${classNameEdited}`}
					id={id}
				>
					<input
						id={id}
						type="text"
						className="edit"
						ref={this.inputEdit}
						onChange={onChangeElement}
						defaultValue={title}
					/>
				</li>
			)
		}

		return (
			<li
				className={`elementTodo  ${classNameEdited}`}
				id={id}
			>
				<input
					type="checkbox"
					onChange={changeState}
					checked={status}
				/>
				<span
					className="throughText"
					onDoubleClick={onDblClick}
				>
					{title}
				</span>
				<button
					type="button"
					className="close button_delete"
					aria-label="Close"
					onClick={handleDeleteItem}
				>
					<span
						aria-hidden="true"
					>
						&times;
					</span>
				</button>
			</li>
		)
	}
}

export default ItemTodoList;
