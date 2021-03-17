import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { startPageLink, homePageLink } from '../actions/urls'

export const PublicRoute = ({ 
    isAuthenticated: isAuthenticated, 
    component: Component,
    ...rest
    }) => (
    <Route {...rest} component={(props) => (
            isAuthenticated ? (
                <Redirect to={homePageLink} />
            ) : (   <Component {...props} /> )
        )} />
    );

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);