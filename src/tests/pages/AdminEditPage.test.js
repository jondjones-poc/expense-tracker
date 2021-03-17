import React from 'react';
import { shallow } from 'enzyme';
import { AdminPageEdit }  from '../../pages/AdminPageEdit';
import expensesTestData from '../Fixtures/expensesTestdata';

let startEditExpense, history, wrapper, startRemoveExpense;

beforeEach(() => {
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(
        <AdminPageEdit
            startEditExpense={startEditExpense} 
            history={history} 
            expense={expensesTestData[1]}
            startRemoveExpense={startRemoveExpense}
        />);
});

test('should render admin page edit', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle edit button click', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expensesTestData[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startEditExpense).toHaveBeenLastCalledWith(expensesTestData[1].id, expensesTestData[1]);
});

test('should handle remove button click', () => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpense).toHaveBeenLastCalledWith({
        id: expensesTestData[1].id
    })
});