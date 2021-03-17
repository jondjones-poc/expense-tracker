import GetExpenseTotal from '../../selectors/expense-total';
import expensesTestData from '../Fixtures/expensesTestdata';

test('No expenses return 0', () => {
    const result = GetExpenseTotal();
    expect(result).toBe(0);
})

test('Should add up a single expense', () => {
    const result = GetExpenseTotal([expensesTestData[0]]);
    expect(result).toBe(expensesTestData[0].amount);
})

test('Should deal with non arrays', () => {
    const result = GetExpenseTotal(expensesTestData[0]);
    expect(result).toBe(0);
})

test('Should add up a single expense', () => {
    const result = GetExpenseTotal([expensesTestData[0]]);
    expect(result).toBe(expensesTestData[0].amount);
})

test('Should add up a single expense', () => {
    const result = GetExpenseTotal(expensesTestData);
    expect(result).toBe(40);
})