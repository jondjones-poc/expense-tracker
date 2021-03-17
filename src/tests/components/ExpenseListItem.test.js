import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem from '../../components/expenseListItem';
import expensesTestData from '../Fixtures/expensesTestdata';

test('Should render expense list item correctly', () => {
    const wrapper = shallow(<ExpenseListItem {...expensesTestData[0]} />);
    expect(wrapper).toMatchSnapshot();
});
