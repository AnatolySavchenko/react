const initialState = {
	todos: [],
	userName: '',
	modelTabs: 'All',
	classNameEdited: '',
	value: '',
	valueEdit: '',
	status: false
};

const todos = (state = initialState, action) => {
	switch (action.type) {
		case 'ACTION_ADD_TODO':
			return [
				...state,
				{
					status: action.status,
					_id: action._id,
					classNameEdited: action.classNameEdited,
					value: action.value
				}
			]

	}
	return state;
};

export default todos;
