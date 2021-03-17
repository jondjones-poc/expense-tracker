import React from 'react'
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filterActions';
import moment from 'moment';

export class ExpenseListFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calendarFocused: undefined,
        };

        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
    };
    onDatesChange({startDate, endDate}) {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };
    onFocusChange(calendarFocused) {
        this.setState(() => ({calendarFocused}));
    };
    onTextChange(e) {
        this.props.setTextFilter(e.target.value)
    };
    onSortChange(e) {
        if (e.target.value === 'date')
        {
            this.props.sortByDate()
        } else if (e.target.value === 'amount')
        {
            this.props.sortByAmount()
        }
    };
    render() {
        return (
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        <input 
                        type="text" 
                        value={this.props.filters.text} 
                        onChange={this.onTextChange} 
                        className="text-input"
                        placeholder="Search expenses" />
                    </div>
                    <div className="input-group__item">
                        <select
                        className="select"
                        value={this.props.filters.sortBy} 
                        onChange={this.onSortChange}
                    >
                        <option value="date">Date</option>
                        <option value="amount">Amount</option>
                    </select>
                    </div>
                    <div className="input-group__item">
                        <DateRangePicker
                        startDate={this.props.filters.startDate}
                        endDate={this.props.filters.endDate}
                        onDatesChange={this.onDatesChange}
                        focusedInput={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        startDateId="startDate"
                        endDateId="endDate"
                        isOutsideRange={() => false}
                        showClearDates={true}>
                    </DateRangePicker>
                    </div>
                </div>
            </div>
        )
    };
}

const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
});


export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);