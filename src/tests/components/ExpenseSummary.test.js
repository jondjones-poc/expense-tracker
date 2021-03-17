import React from 'react';
import { shallow } from 'enzyme';
import ExpenseSummary from '../../components/expenseListItem';
import expensesTestData from '../Fixtures/expensesTestdata';

test('Should render expense list item correctly', () => {
    const wrapper = shallow(<ExpenseSummary />);
    expect(wrapper).toMatchSnapshot();
});
