import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import { startLogout } from '../actions/authActions';
import { connect } from 'react-redux';

export class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <div className="content-container">
                    <div className="header__content">
                        <Link to={this.props.homePageLink} className="header__title">
                            <h1>
                                Expense Tracker
                            </h1>
                        </Link>
                        <button onClick={this.props.startLogout} className="button button--link">
                            Logout
                        </button>
                    </div>
                </div>
            </header>
        )}
    };

    const mapDispatchToProps = (dispatch) => ({
        startLogout: () => dispatch(startLogout())
    });

    
export default connect(undefined, mapDispatchToProps)(Header);