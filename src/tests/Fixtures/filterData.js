import moment from 'moment';

const defaultFilter = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const dateSortFilters = {
    text: 'bills',
    sortBy: 'rent',
    startDate: moment(0),
    endDate: moment(0).add(3, 'days')
};

export { defaultFilter, dateSortFilters };


