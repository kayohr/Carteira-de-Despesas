import {
  EDIT_EXPENSES, EDIT_EXPENSES_SUCESS, REMOVE_EXPENSE, RESPONSE_ECONOMY_SUCCESS,
  RESPONSE_EXPENSE_SUCCESS,
} from '../actions';

const INITIAL_STATE = {

  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0,
  newIdToEdit: 0,

};

const walletReducer = (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
  case RESPONSE_ECONOMY_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.wallet).filter((element) => element !== 'USDT'),
    };
  case RESPONSE_EXPENSE_SUCCESS:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.wallet,
      ],
      newIdToEdit: state.newIdToEdit + 1,
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((element) => element.id !== action.delet),
    };
  case EDIT_EXPENSES:
    return {
      ...state,
      editor: true,
      idToEdit: Number(action.expensesId),
    };
  case EDIT_EXPENSES_SUCESS:
    return {
      ...state,
      editor: false,
      expenses: action.expensesSucess,
    };
    // case RESPONSE_ECONOMY_ERROR:
    //   return {
    //     ...state,
    //     error: action.error,
    //   };

  default:
    return state;
  }
};

export default walletReducer;
