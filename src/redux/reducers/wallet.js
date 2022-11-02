import { RESPONSE_ECONOMY_SUCCESS } from '../actions';

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
    // case ADD_WALLET:
    //   return {
    //     ...state,
    //     currencies: action.currencies,
    //   };
    // case REQUEST_ECONOMY:
    //   return {
    //     ...state,
    //   };
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
