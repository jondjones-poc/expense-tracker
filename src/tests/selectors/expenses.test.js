import getVisibleExpenses from '../../selectors/expenses';
import moment from 'moment';
import expensesTestData from '../Fixtures/expensesTestdata';

test('should filter by text {rent}', () => {
    const filters = {
        text: 'rent',
        sortBy:'date',
        startDate: undefined,
        endDatte: undefined
    };

    const result = getVisibleExpenses(expensesTestData, filters);
    expect(result).toEqual([expensesTestData[0]]);
});


test('should sort by date', () => {
    const filters = {
        text: undefined,
        sortBy:'date',
        startDate: undefined,
        endDatte: undefined
    };

    const result = getVisibleExpenses(expensesTestData, filters);
    expect(result).toEqual([expensesTestData[2], expensesTestData[0], expensesTestData[1]]);
});

test('should sort by amount', () => {
    const filters = {
        text: undefined,
        sortBy:'amount',
        startDate: undefined,
        endDatte: undefined
    };

    const result = getVisibleExpenses(expensesTestData, filters);
    expect(result).toEqual([expensesTestData[1], expensesTestData[0], expensesTestData[2]]);
});

test('should filter by startDate', () => {
    const filters = {
        text: undefined,
        sortBy:'amount',
        startDate: moment(0),
        endDatte: undefined
    };

    const result = getVisibleExpenses(expensesTestData, filters);
    expect(result).toEqual([expensesTestData[0], expensesTestData[2]]);
});

test('should filter by endDate', () => {
    const filters = {
        text: undefined,
        sortBy:'amount',
        startDate: undefined, 
        endDatte: moment(0),
    };

    const result = getVisibleExpenses(expensesTestData, filters);
    expect(result).toEqual([expensesTestData[1], expensesTestData[0], expensesTestData[2]]);
});