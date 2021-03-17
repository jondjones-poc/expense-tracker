import moment from 'moment';

// Get visible expenses 
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        var createdAtMoment = moment(expense.createdAt);

        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;

        const textMatch = (text && expense.description) ? expense.description.toLowerCase().includes(text.toLowerCase()) : true;

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

export default getVisibleExpenses;