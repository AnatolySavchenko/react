import React from 'react';

class CountItems extends React.Component{
	render() {
		const {items} = this.props;
		let countArray = items.filter(item => !item.status);
		return(
			<div className='forSpan'>
				<p>{countArray.length} items left</p>
			</div>
		)
	}
}

export default CountItems;
