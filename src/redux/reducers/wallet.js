import {
  REMOVE_EXPENSE, RESPONSE_ECONOMY_SUCCESS,
  RESPONSE_EXPENSE_SUCCESS,
} from '../actions';

const INITIAL_STATE = {

  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada

};

const walletReducer = (state = INITIAL_STATE, action) => {
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
      idToEdit: state.idToEdit + 1,
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((element) => element.id !== action.delet),
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
