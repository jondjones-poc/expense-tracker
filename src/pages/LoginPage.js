import React from 'react'
import { connect } from 'react-redux';
import { startLogin } from '../actions/authActions';

const LoginPage = ({ startLogin }) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 class="box-layout__title">
                Expense Tracker
            </h1>
            <p>Track your expenses... <br />like a BOSS</p>
            <button onClick={startLogin} className="button">Login with Google</button>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);