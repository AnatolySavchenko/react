const todos = (state = [], action) => {
	if (action.type){
		return [
			...state,
			{
				text:action.text,
				status: false
			}
		]
	}
		};

export default todos;
