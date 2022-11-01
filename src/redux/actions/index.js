export const ADD_USER = 'ADD_USER';
export const ADD_WALLET = 'ADD_WALLET';

export const addUser = (email) => ({
  type: ADD_USER,
  email,
});

export const addWallet = (wallet) => ({
  type: ADD_WALLET,
  wallet,
});
