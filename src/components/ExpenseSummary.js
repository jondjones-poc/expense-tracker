import numeral from 'numeral';
import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { adminPageCreateLink } from '../actions/urls';

import getExpenseTotal from '../selectors/expense-total';
import selectExpenses from '../selectors/expenses';

export const ExpenseSummary = ({totalItems, totalAmount}) => {
        const formattedTotalAmount = numeral(totalAmount / 100).format('$0,0.00');
        return (
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">
                        <span>You have {totalItems}</span> expense(s) totaling <span>{formattedTotalAmount}</span>
                    </h1>
                    <div className="page-header__actions">
                        <Link to={adminPageCreateLink} className="button" >Create An Expense</Link>
                    </div>
                </div>
            </div>
    )};

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    const totalAmount = getExpenseTotal(visibleExpenses);

    return {
        totalAmount: totalAmount,
        totalItems: visibleExpenses.length
    }
};

export default connect(mapStateToProps)(ExpenseSummary);