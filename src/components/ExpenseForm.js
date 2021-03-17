import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.notes : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            containsInvalidData: false
        }
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onNoteChange = this.onNoteChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onCalendarDateChange = this.onCalendarDateChange.bind(this);
        this.onCalendarFocusChange = this.onCalendarFocusChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onDescriptionChange(e) {
        const description = e.target.value;
        this.setState(() => ({description}));
    };
    onNoteChange(e) {
        const note = e.target.value;
        this.setState(() => ({note}));
    };
    onAmountChange(e) {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
          }
      };
    onCalendarDateChange(createdAt) {
        if (createdAt) {
            this.setState(() => ({createdAt}))
        }
      };
    onCalendarFocusChange(e) {
        this.setState(() => ({calendarFocused: e.focused }))
      };
    onSubmit(e) {
        e.preventDefault();

        if (!this.state.description || !this.state.amount)
        {
            this.setState(() => ({containsInvalidData: true}))
        } else {
            this.setState(() => ({containsInvalidData: false}))
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount,10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                not: this.state.note
            })
        }
    }
    render() {
        return (
                <form onSubmit={this.onSubmit} className="form">
                {this.state.containsInvalidData && <div className="form__error">Description and amount are required</div>}
                    <input
                        type="text"
                        className="text-input"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input
                        type="number"
                        className="text-input"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <div className="singledatepicker"  >
                        <SingleDatePicker
                            date={this.state.createdAt}
                            onDateChange={this.onCalendarDateChange}  
                            onFocusChange={this.onCalendarFocusChange} 
                            focused={this.state.calendarFocused}   
                            isOutsideRange={() => false}           
                        />
                    </div>
                    <textarea
                        placeholder="Notes"
                        className="textarea"
                        value={this.state.note}
                        onChange={this.onNoteChange}>
                    </textarea>
                    <div>
                        <button className="button">Save Expense</button>
                    </div>
                </form>
        )
    }
}