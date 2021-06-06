import React         from 'react';
import ReactDOM      from 'react-dom';
import './index.css';
import App           from './App';
import { rootStore } from "./stores/root.store";

ReactDOM.render(
	<React.StrictMode>
		<App store={rootStore}/>
	</React.StrictMode>,
	document.getElementById('root')
);
