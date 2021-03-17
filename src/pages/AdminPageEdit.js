import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from '../components/ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenseActions';

export class AdminPageEdit extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemove = this.onRemove.bind(this);
    };
    onSubmit(expense) {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    };
    onRemove() {
        this.props.startRemoveExpense({ id: this.props.expense.id });
        this.props.history.push('/');
    };
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container" >
                        <h1 className="page-header__title">
                            Edit Expense
                        </h1>
                    </div>
                </div>
                <div className="content-container" >
                        <ExpenseForm
                                expense={this.props.expense}
                                onSubmit={this.onSubmit}
                            />
                            <button onClick={this.onRemove} className="button button-remove">
                                Remove Expense
                            </button>
                    </div>
            </div>
        );
    }
}
 
const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  });
  
  const mapDispatchToProps = (dispatch, props) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
  });

export default connect(mapStateToProps, mapDispatchToProps)(AdminPageEdit);