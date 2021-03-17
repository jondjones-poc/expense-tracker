const getExpensesRoute = (uid, id) => {
    if (id !== undefined) {
        return `users/${uid}/expenses/${id}`;   
    }
    return `users/${uid}/expenses`;
};

export default getExpensesRoute;