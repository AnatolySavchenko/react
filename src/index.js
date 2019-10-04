import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers';
import App from './App';

const store = createStore(rootReducer);

render(
	<Provider store={store}>
	<App/>
	</Provider>,
	document.getElementById('root')
);

serviceWorker.unregister();
