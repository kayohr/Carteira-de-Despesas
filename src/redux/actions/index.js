import getEconomy from '../services/API';

export const ADD_USER = 'ADD_USER';
export const ADD_WALLET = 'ADD_WALLET';
export const REQUEST_ECONOMY = 'REQUEST_ECONOMY';
export const RESPONSE_ECONOMY_SUCCESS = 'RESPONSE_ECONOMY_SUCCESS';
export const RESPONSE_ECONOMY_ERROR = 'RESPONSE_ECONOMY_ERROR';

export const addUser = (email) => ({
  type: ADD_USER,
  email,
});
// export const addWallet = (wallet) => ({
//   type: ADD_WALLET,
//   wallet,
// });

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
