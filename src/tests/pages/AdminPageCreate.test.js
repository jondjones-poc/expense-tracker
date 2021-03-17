import React from 'react';
import { shallow } from 'enzyme';
import { AdminPageCreate }  from '../../pages/AdminPageCreate';
import expensesTestData from '../Fixtures/expensesTestdata';

let startAddExpense, history, wrapper;

beforeEach(() => {
    startAddExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(
        <AdminPageCreate 
            startAddExpense={startAddExpense} 
            history={history} 
        />);
});

test('should render admin page create', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle submit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expensesTestData[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startAddExpense).toHaveBeenLastCalledWith(expensesTestData[1]);
});