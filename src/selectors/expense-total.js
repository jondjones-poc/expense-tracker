const getExpenseTotal = (expenses) => {
    let total = 0;

    if (expenses === undefined 
        || (expenses instanceof Array == false)
        || expenses.length === 0)
    {
        return total;
    }

    expenses.forEach((expense) => {
        total = total + expense.amount;
    });
    return total;
}

export default getExpenseTotal;