import getEconomy from '../services/API';

export const ADD_USER = 'ADD_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';
export const REQUEST_ECONOMY = 'REQUEST_ECONOMY';
export const RESPONSE_ECONOMY_SUCCESS = 'RESPONSE_ECONOMY_SUCCESS';
export const RESPONSE_ECONOMY_ERROR = 'RESPONSE_ECONOMY_ERROR';
export const REQUEST_EXPENSE = 'REQUEST_EXPENSE';
export const RESPONSE_EXPENSE_SUCCESS = 'RESPONSE_EXPENSE_SUCCESS';
export const RESPONSE_EXPENSE_ERROR = 'RESPONSE_EXPENSE_ERROR';
export const EDIT_EXPENSES_SUCESS = 'EDIT_EXPENSES_SUCESS';

export const addUser = (email) => ({
  type: ADD_USER,
  email,
});
export const addExpense = (wallet) => ({
  type: ADD_EXPENSE,
  wallet,
});
export const removeExpense = (delet) => ({
  type: REMOVE_EXPENSE,
  delet,
});

export const editExpenses = (expensesId) => ({
  type: EDIT_EXPENSES,
  expensesId,
});

// action creator
export const requestEconomy = () => ({
  type: REQUEST_ECONOMY,
});

export const responseEconomySuccess = (wallet) => ({
  type: RESPONSE_ECONOMY_SUCCESS,
  wallet,
});

export const responseEconomyError = (error) => ({
  type: RESPONSE_ECONOMY_ERROR,
  error,
});

export const editExpensesSucess = (expensesSucess) => ({
  type: EDIT_EXPENSES_SUCESS,
  expensesSucess,
});

export function fetchEconomy() {
  return async (dispatch) => {
    // logica
    // avisar a aplicacao que o fetch vai comecar
    dispatch(requestEconomy());
    // fetch
    try {
      const response = await getEconomy();
      // console.log(response);
      dispatch(responseEconomySuccess(response));
    } catch (error) {
      dispatch(responseEconomyError(error));
    }
  };
}

export const requestExpense = () => ({
  type: REQUEST_EXPENSE,
});

export const responseExpenseSuccess = (wallet) => ({
  type: RESPONSE_EXPENSE_SUCCESS,
  wallet,
});

export const responseExpenseError = (error) => ({
  type: RESPONSE_EXPENSE_ERROR,
  error,
});

export function fetchValue(walletExpenses) {
  return async (dispatch, getState) => {
    // logica
    // avisar a aplicacao que o fetch vai comecar
    // fetch
    try {
      const { wallet: { newIdToEdit } } = getState();
      dispatch(requestExpense());
      const response = await getEconomy();
      const newExpenses = { id: newIdToEdit,
        ...walletExpenses,
        exchangeRates: response,
      };
      // console.log(response);
      dispatch(responseExpenseSuccess(newExpenses));
    } catch (error) {
      // console.log(error);
      dispatch(responseExpenseError(error));
    }
  };
}
