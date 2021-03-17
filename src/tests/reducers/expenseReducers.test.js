import expensesReducer from '../../reducers/expensesReducer';
import expensesTestData from '../Fixtures/expensesTestdata';

test('should setup default filter values', () => {
    const state = expensesReducer( undefined, { type: '@@INT'});
    expect(state).toEqual([]);
});

test('should remove valid expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expensesTestData[0].id
    }

    const state = expensesReducer( expensesTestData, action);
    expect(state).toEqual([expensesTestData[1], expensesTestData[2]]);
});

test('should not remove invalid id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-4'
    }

    const state = expensesReducer( expensesTestData, action);
    expect(state).toEqual([expensesTestData[0], expensesTestData[1], expensesTestData[2]]);
});

test('should add expense', () => {
    const newExpense ={
        id: '4',
        description: 'rent',
        note: '',
        amount: 10,
        createdAt: 0
    }

    const action = {
        type: 'ADD_EXPENSE',
        id: '1',
        expense: newExpense
    }

    const state = expensesReducer( expensesTestData, action);
    expect(state).toEqual([expensesTestData[0], expensesTestData[1], expensesTestData[2], newExpense]);
});


test('should edit expense on valid id', () => {
    const testText = 'jon';
    const amount = 50;

    const action = {
        type: 'EDIT_EXPENSE',
        id: expensesTestData[0].id,
        updates: {
            description: testText,
            amount: amount
        }
    }

    const state = expensesReducer( expensesTestData, action);
    expect(state[0]).toEqual({
        id: '1',
        description: testText,
        note: '',
        amount: amount,
        createdAt: 0
    });
});


test('should edit expense on valid id', () => {
    const testText = 'jon';
    const amount = 50;

    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: {
            description: testText,
            amount: amount
        }
    }

    const state = expensesReducer( expensesTestData, action);
    expect(state).toEqual(expensesTestData);
});


test('should setup set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [expensesTestData[1]]
    };

    const state = expensesReducer(expensesTestData, action);
    expect(state).toEqual([expensesTestData[1]])
});


