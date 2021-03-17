import React from 'react'
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { startPageLink, adminPageEditLink, homePageLink, adminPageCreateLink } from '../actions/urls'

//Pages
import Homepage from '../pages/homepage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/notfoundpage';
import AdminPageCreate from '../pages/AdminPageCreate';
import AdminPageEdit from '../pages/AdminPageEdit';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
        <Switch>
            <PublicRoute path={startPageLink} component={LoginPage} exact={true} />
            <PrivateRoute path={homePageLink} component={Homepage} />
            <PrivateRoute path={adminPageCreateLink} component={AdminPageCreate} />
            <PrivateRoute path={adminPageEditLink} component={AdminPageEdit} />
            <Route component={NotFoundPage} />
        </Switch>
    </div>
  </Router>
);

export default AppRouter;