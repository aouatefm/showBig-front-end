import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastProvider } from "react-toast-notifications";

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <ToastProvider>
            <App/>
            </ToastProvider>
        </Router>
    </Provider>,
    document.getElementById('root')
);

