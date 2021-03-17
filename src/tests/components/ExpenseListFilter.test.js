import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/expenseListFilters';
import { defaultFilter, dateSortFilters } from '../Fixtures/filterData';
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            filters={defaultFilter}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    )
});

test('Should render expense list filter correctly with default filter', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should render expense list filter correctly with sort filter', () => {
    wrapper.setProps({
        filters: dateSortFilters
    });

    expect(wrapper).toMatchSnapshot();
});

test('Should handle text change', () => {
    const value = 'New Value';
    wrapper.find('input').simulate('change', {
      target: { value }
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('Should handle start date change', () => {
    const startDate = moment(0).add(-4, 'days');
    const now = moment(0);

    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({startDate, now})

    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
});

test('Should handle end date change', () => {
    const now = moment(0);
    const endDate = moment(0).add(-4, 'days');

    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({now, endDate})

    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('Should handle sortby amount', () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', {
      target: { value }
    });
    expect(sortByAmount).toBeCalled();
});

test('Should handle sortby date', () => {
    const value = 'date';
    wrapper.find('select').simulate('change', {
      target: { value }
    });
    expect(sortByDate).toBeCalled();
});

test('Should handle focus change', () => {
    const focused = 'endDate';
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(focused);
    expect(wrapper.state('calendarFocused')).toBe(focused);
});