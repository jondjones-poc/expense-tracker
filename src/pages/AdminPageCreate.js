import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from '../components/ExpenseForm';
import { startAddExpense } from '../actions/expenseActions';

export class AdminPageCreate extends React.Component {
  constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
  };
  onSubmit(expense) {
    this.props.startAddExpense(expense);
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container" >
            <h1 className="page-header__title">
              Add Expense
            </h1>
          </div>
        </div>
        <div className="content-container" >
            <ExpenseForm
              history={this.props.history} 
              onSubmit={this.onSubmit}
            />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AdminPageCreate);
