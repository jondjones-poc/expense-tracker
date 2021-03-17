import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { startPageLink, homePageLink, adminPageCreateLink, adminPageEditLink } from '../actions/urls'

import Header from '../components/header';

export const PrivateRoute = ({ 
    isAuthenticated: isAuthenticated, 
    component: Component,
    ...rest
    }) => (
    <Route {...rest} component={(props) => (
            isAuthenticated ? (
                <div>
                {isAuthenticated}
                    <Header  
                        homePageLink={homePageLink}
                        adminPageCreateLink={adminPageCreateLink}
                        adminPageEditLink={adminPageEditLink}
                    />
                    <Component {...props} />
                </div>
            ) : ( <Redirect to={startPageLink} /> )
        )} />
    );

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);