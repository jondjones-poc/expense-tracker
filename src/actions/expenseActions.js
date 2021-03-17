import uuid from 'uuid';
import database from '../firebase/firebase';
import getExpensesRoute from '../firebase/firebasePaths';

// ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;
        const expense = { description, note, amount, createdAt};

        return database.ref(getExpensesRoute(getState().auth.uid)).push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }))
        });
    };
};

// REMOVE_EXPENSE
export const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id: id
});

// START_REMOVE_EXPENSE
export const startRemoveExpense = ({id} = {}) => {
    return (dispatch, getState) => {
        return database
            .ref(getExpensesRoute(getState().auth.uid, id))
            .remove()
            .then(() => {
                dispatch(removeExpense({id}));
            }).catch((e) => {
                console.log('error removing entry from firebase', e);
            });
        };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// START_EDIT_EXPENSE
export const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        return database
            .ref(getExpensesRoute(getState().auth.uid, id))
            .update({
                amount: updates.amount,
                createdAt: updates.createdAt,
                description: updates.description || '',
                note: updates.note || ''
                })
            .then(() => {
                dispatch(editExpense(id, updates));
            }).catch((e) => {
                console.log('error updating entry within firebase', e);
            });
        };
};

// SET_EXPENSE
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

// START_SET_EXPENSE
export const startSetExpenses = (expenseData = []) => {
    return (dispatch, getState) => {
        return database.ref(getExpensesRoute(getState().auth.uid))
        .once('value')
        .then((snapshot) => {

            snapshot.forEach((childSnapshot) => {
                expenseData.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(setExpenses(expenseData))
        }).catch((e) => {
            console.log('error setting expenses', e);
        });;
    };
};