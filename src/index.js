import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Approutes from './routes';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'; // Import the Provider
import store from './store/index'; // Import your Redux store
import {Navbar} from './component/Navbar'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Provider store={store}> 
        <BrowserRouter>
            <Approutes />
        </BrowserRouter>
      </Provider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
