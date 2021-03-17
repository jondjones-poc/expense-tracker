import filtersReducer from '../../reducers/filtersReducer'
import moment from 'moment';

test('should setup default filter values', () => {
    const state = filtersReducer( undefined, { type: '@@INT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: undefined, 
        endDate: undefined
    });
});

test('should set sortBy to amount', () => {
    const state = filtersReducer( undefined, { type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
    const state = filtersReducer( undefined, { type: 'SORT_BY_DATE'});
    expect(state.sortBy).toBe('date');
});

test('should set sortBy to date', () => {
    const testState = {
        text: '',
        sortBy: 'dsjadakl',
        startDate: moment().startOf('month'), 
        endDate: moment().endOf('month')
    };

    const state = filtersReducer( testState, { type: 'SORT_BY_DATE'});
    expect(state.sortBy).toBe('date');
});

test('set text  sets text as expected', () => {
    const testText = 'hjhjk';
    const state = filtersReducer( undefined, { type: 'SET_TEXT_FILTER',text: testText});
    expect(state.text).toBe(testText);
});

test('set start date sets text as expected', () => {
    const testText = 'hjhjk';
    const state = filtersReducer( undefined, { type: 'SET_START_DATE', startDate: testText});
    expect(state.startDate).toBe(testText);
});

test('set end date sets text as expected', () => {
    const testText = 'hjhjk';
    const state = filtersReducer( undefined, { type: 'SET_END_DATE', endDate: testText});
    expect(state.endDate).toBe(testText);
});
