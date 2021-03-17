import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/expenseList';
import expensesTestData from '../Fixtures/expensesTestdata';

test('Should render expenselist with expenses', () => {
    const wrapper = shallow(<ExpenseList expenses={expensesTestData} />);
    expect(wrapper).toMatchSnapshot();
});

test('Should render expenselist with empty data', () => {
    const wrapper = shallow(
         <ExpenseList expenses={[]} />
     );
     expect(wrapper).toMatchSnapshot();
});
