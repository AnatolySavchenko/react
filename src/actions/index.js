import {ACTION_ADD_TODO} from '../index';

const addTodo = (text) => {
	return {
		type:ACTION_ADD_TODO,
		text
	}
};


