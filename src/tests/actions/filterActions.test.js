import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from "../../actions/filterActions";
import moment from 'moment';

test('should set start date for setStartDate', () => {
    const time = moment(0);
    const action = setStartDate(time);
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: time
    })
});

test('should set end date for setEndDate', () => {
    const time = moment(0);
    const action = setEndDate(time);
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: time
    })
});

test('should set empty string for setTextFilter', () => {
    const time = moment(0);
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    })
});

test('should set valid string for setTextFilter', () => {
    const time = moment(0);
    const testText = 'testtext';

    const action = setTextFilter(testText);
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: testText
    })
});

test('should set default values for sortByDate', () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    })
});

test('should set default values for sortByAmount', () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    })
});