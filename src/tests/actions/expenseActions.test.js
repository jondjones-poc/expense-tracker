import { removeExpense, startRemoveExpense, startEditExpense, editExpense, addExpense, startAddExpense, setExpenses,startSetExpenses } from "../../actions/expenseActions";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';
import expensesReducer from "../../reducers/expensesReducer";
import expensesTestData from '../Fixtures/expensesTestdata';
import getExpensesRoute from '../../firebase/firebasePaths';

const uid = '34yf78erhgfuidf';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const firestoreData = {};
    expensesTestData.forEach(({ id, description, note, amount, createdAt }) => {
        firestoreData[id] = { description, note, amount, createdAt };
    });

    database.ref(getExpensesRoute(uid)).set(firestoreData).then(() => done());
});

test('should setup set expense with data', () => {
    const action = setExpenses(expensesTestData);
     expect(action).toEqual({
         type: 'SET_EXPENSES',
         expenses: expensesTestData
    });
});

test('should setup set expense with matching first array', () => {
    const action = setExpenses(expensesTestData);
    expect(action.expenses[0]).toEqual({
        amount: expensesTestData[0].amount,
        createdAt: expensesTestData[0].createdAt,
        description: expensesTestData[0].description,
        id: expensesTestData[0].id,
        note: expensesTestData[0].note
    });
});

test('should set expenses with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses: expensesTestData
        });
        done();
        }).catch((e) => {
            console.log(e)
        });
});

test('should setup remove expense action object', () => {
    const id = '123';
    const action = removeExpense({id: id});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: id
    });
});

test('should remove expense', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expensesTestData[0].id;
    store.dispatch(startRemoveExpense({id})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id: id
        });
    });

    return database
    .ref(getExpensesRoute(uid, id))
    .once('value')
    .then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

test('should setup edit expense action object', () => {
    const id = '123';
    const action = editExpense(id, {note:'ddd'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: id,
        updates: {note:'ddd'}
    });
});

test('should edit expense with data to database and store', (done) => {
    const id = expensesTestData[0].id;
    const updates = {
        description: 'update',
        note: 'update',
        amount: -89,
        createdAt: -89,
    };
    
    const store = createMockStore(defaultAuthState);
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });

        database
        .ref(getExpensesRoute(uid, id))
        .once('value')
        .then((snapshot) => {
            expect(snapshot.val()).toEqual(updates);
            done();
        }).catch((e) => {
            console.log(e)
        });;
    });
});

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expensesTestData[0]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expensesTestData[0]
    }) 
});

test('should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
      };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                ...expenseData,
                id: expect.any(String),
            }
        });

        database
            .ref(getExpensesRoute(uid, actions[0].expense.id))
            .once('value')
            .then((snapshot) => {
                expect(snapshot.val()).toEqual(expenseData);
                done();
            });
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const emptyExpenseData = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0,
    };

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                ...emptyExpenseData,
                id: expect.any(String),
            }
        });

        const id = actions[0].expense.id;
        database
        .ref(getExpensesRoute(uid, id))
        .once('value')
        .then((snapshot) => {
            expect(snapshot.val()).toEqual(emptyExpenseData);
            done();
        }).catch((e) => {
            console.log(e)
        });;
    });
});

