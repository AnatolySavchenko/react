import React, {Component} from 'react';

class ButtonForActive extends Component {
	render() {
		const {
			deleteCompleteItems,
			handleShowTabs
		} = this.props;
		return (
			<div
				className='forButton'
			>
				<input
					type='button'
					className='ArraySorting style-for-input'
					value='All'
					onClick={() => handleShowTabs('All')}
				/>
				<input
					type='button'
					className='ArraySorting style-for-input'
					value='Active'
					onClick={() => handleShowTabs('Active')}
				/>
				<input
					type='button'
					className='ArraySorting style-for-input'
					value='Completed'
					onClick={() => handleShowTabs('Completed')}
				/>
				<input
					type='button'
					className='ArraySorting style-for-input'
					value='Delete all'
					onClick={deleteCompleteItems}/>
			</div>
		)
	}
}

export default ButtonForActive
