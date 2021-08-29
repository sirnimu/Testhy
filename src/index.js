import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/index.scss';
import { GifContextProvider } from './store/gifs-context';

ReactDOM.render(<GifContextProvider><App /></GifContextProvider>,document.getElementById('root'));