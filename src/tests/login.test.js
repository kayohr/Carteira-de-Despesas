import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import App from '../App';
import rootReducer from '../redux/reducers';
import { renderWithRouter, renderWithRouterAndRedux } from './helpers/renderWith';

describe('', () => {
  test('1- testar rota e botão desabilitado', () => {
    const { history } = renderWithRouterAndRedux(<App />, ['/']);
    const login = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);
    const btnValidete = screen.getByRole('button', { name: 'Entrar' });
    userEvent.type(login, 'email@email.com');
    userEvent.type(password, '123456');
    expect(btnValidete).toBeEnabled();
    userEvent.click(btnValidete);
    expect(history.location.pathname).toBe('/carteira');
  });

  test('2- login e email', () => {
    const store = createStore(rootReducer);
    renderWithRouter(
      <Provider store={ store }>
        <App />
      </Provider>,
    );
    const login = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);
    const btnValidete = screen.getByRole('button', { name: 'Entrar' });
    expect(btnValidete).toBeDisabled();

    expect(login).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    // expect(btnValidete).toBeDisabled(login === '' && password === '');
    // expect(btnValidete).toBeInTheDocument(login && password);

    userEvent.type(login, 'email@test.com');
    userEvent.type(password, '/password/i');
  });
  test('3- testar rota para carteira', () => {
    // const store = createStore(rootReducer);
    renderWithRouterAndRedux(<App />, ['/carteira']);
    // expect(history.location.pathname).toBe('/carteira');
    // const btnValidete = screen.getByRole('button', { name: '/entrar/i' });
    // expect(btnValidete).toBeDisabled();
    // expect(btnValidete).toBeInTheDocument();
  });
  test('4- email Header', () => {
    const store = createStore(rootReducer);
    renderWithRouter(
      <Provider store={ store }>
        <App />
      </Provider>,
    );
    const login = screen.getByRole('textbox');
    userEvent.type(login, 'test@test.com');
    const password = screen.getByRole('textbox');
    userEvent.type(password, '/password/i');
    const btnValidete = screen.getByRole('button');
    expect(btnValidete).toBeDisabled();
    expect(btnValidete).toBeInTheDocument();
    userEvent.click(btnValidete);
  });
});
