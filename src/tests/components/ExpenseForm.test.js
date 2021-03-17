import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expensesTestData from '../Fixtures/expensesTestdata';
import moment from 'moment';

test('Should render enxpense form correctly with no value', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('Should render enxpense form correctly with valid expense', () => {
    const wrapper = shallow(<ExpenseForm expense={expensesTestData[0]} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
      preventDefault: () => { }
    });
    expect(wrapper.state('containsInvalidData')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });


test('should set description on input change', () => {
    const value = 'New Value';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', {
      target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
  });

  test('should set note on text area change', () => {
    const value = 'New Note';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').at(0).simulate('change', {
      target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
  });

  test('should set amount on valid input data', () => {
    const value = '23.50';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
      target: { value }
    });
    expect(wrapper.state('amount')).toBe(value);
  });

  test('should set amount on valid invalid input data', () => {
    const value = '23.500';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
      target: { value }
    });
    expect(wrapper.state('amount')).toBe('');
  });

  test('should call onSubmit prop for valid submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expensesTestData[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
      });
    
    expect(wrapper.state('containsInvalidData')).toBeFalsy();
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expensesTestData[0].description,
        amount: expensesTestData[0].amount,
        note: expensesTestData[0].notes,
        createdAt: expensesTestData[0].createdAt
    });
  });

  test('should set date onDateChange', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toBe(now);
  });
  
  test('should set calendar focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused });
    expect(wrapper.state('calendarFocused')).toBe(focused);
  });
  


