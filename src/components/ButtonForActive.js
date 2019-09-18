import React from 'react';

class ButtonForActive extends React.Component{
	render() {
		const { deleteCompleteItems,handleActive,handleCompleted,handleAll,items } = this.props;
		return(
			<div className='forButton'>
				<input type='button' className='ArraySorting style-for-input' value='All' onClick={() => handleAll(items)} />
				<input type='button' className='ArraySorting style-for-input' value='Active' onClick={() => handleActive(items)} />
				<input type='button' className='ArraySorting style-for-input' value='Completed' onClick={() => handleCompleted(items)} />
				<input type='button' className='ArraySorting style-for-input' value='Delete all' onClick={deleteCompleteItems} />
			</div>
		)
	}
}

export default ButtonForActive
