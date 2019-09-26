import React from  'react';

class AddTodo extends React.Component {
	render() {
		const {
			item,
			handleChange,
			handleSubmit,
			handleKeyPress,
			handleCheckAll
		} = this.props;
		return (
			<div
				className="forInputAndButton"
			>
				<input
					type="text"
					className="style-for-input"
					placeholder="enter todo"
					value={item}
					onChange={handleChange}
					onKeyPress={handleKeyPress}
				/>
				<input
					type="button"
					className="style-for-input"
					value="add"
					onClick={handleSubmit}/>
				<input
					type="button"
					className="style-for-input"
					value="check All"
					onClick={handleCheckAll}/>
			</div>
		)
	}
}

export default AddTodo;
