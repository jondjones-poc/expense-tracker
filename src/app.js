import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import AppRouter, { history } from './router/AppRouter';
import {firebase} from './firebase/firebase';
import configureStore from './store/configureStore'
import { startSetExpenses, removeExpense, editExpense } from './actions/expenseActions';
import { login, logout } from './actions/authActions';
import 'react-dates/initialize';
import "normalize.css/normalize.css";
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { startPageLink, homePageLink } from './actions/urls'
import PageLoading from './components/PageLoading';

const store = configureStore();

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        const jsx = (
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        ReactDOM.render(jsx, document.getElementById('mainElement'));
        hasRendered = true;
    }
};

ReactDOM.render(<PageLoading />, document.getElementById('mainElement'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('logged in');
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
        renderApp();   
        }).catch((e) => {
            console.log(e);
        });

        if(history.location.pathname === startPageLink) {
            history.push(homePageLink);
        }
        
    } else  {
        store.dispatch(logout());
        renderApp();   
        history.push(startPageLink);
    }
});
