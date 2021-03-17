import React from 'react'
import ReactDOM from 'react-dom'
import ExpenseList from '../components/expenseList';
import ExpenseListFilters from '../components/expenseListFilters';
import ExpenseSummary from '../components/ExpenseSummary';

const Homepage = () => (
    <div>
        <ExpenseSummary />
        <ExpenseListFilters />
        <ExpenseList />
    </div>
);

export default Homepage;