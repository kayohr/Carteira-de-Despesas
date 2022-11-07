import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('', () => {
  test('1- verificar se o email ta na tela', () => {
    const INITIAL_STATE = {

      email: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i,

    };
    renderWithRouterAndRedux(<App />, ['/carteira'], {
      initialState: INITIAL_STATE,
    });
    const loginEmail = screen.getByPlaceholderText(/email/i);
    expect(loginEmail).toBeInTheDocument();
  });
  test('2- verificar se está na pagina carteira', () => {
    renderWithRouterAndRedux(<App />, ['/carteira']);
  });
  test('3-Se o inicial da despesa começa com 0', () => {
    renderWithRouterAndRedux(<Wallet />);
    const zeroDataId = screen.getByTestId('total-field');
    expect(zeroDataId).toHaveTextContent(0);
  });
  test('4-Verificar se tem adicionar e descrição de despesa na tela', () => {
    renderWithRouterAndRedux(<Wallet />);
    const addEspense = screen.getByPlaceholderText(/Adicionar despesa/i);
    const descriptionEspense = screen.getByPlaceholderText(/Descrição da despesa/i);
    expect(addEspense).toBeInTheDocument();
    expect(descriptionEspense).toBeInTheDocument();
    const idEspense = screen.getByTestId('value-input');
    expect(idEspense).toBeInTheDocument();
    const idDescription = screen.getByTestId('description-input');
    expect(idDescription).toBeInTheDocument();
  });
  test('5-Verificar se tem opção de pagamento e a categoria para gastar', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const methodPayment = screen.getByTestId('method-input');
    expect(methodPayment).toBeInTheDocument();
    const expenseCategory = screen.getByTestId('tag-input');
    expect(expenseCategory).toBeInTheDocument();
    const coin = screen.getByTestId('currency-input');
    expect(coin).toBeInTheDocument();
    await waitFor(() => {
      userEvent.selectOptions(methodPayment, 'Dinheiro');
      userEvent.selectOptions(expenseCategory, 'Alimentação');
      userEvent.selectOptions(coin, 'USD');
      expect(screen.getByRole('button', { name: 'Adicionar despesa' })).toBeVisible();
    });
  });

  test('6-Verificar se tem o botao de adicionar despesas', () => {
    renderWithRouterAndRedux(<Wallet />);
    const btnValidete = screen.getByRole('button');
    expect(btnValidete).toBeInTheDocument();
    userEvent.click(btnValidete);
  });
  test('7-Moedas', async () => { // Ajuda da Bia e Ellen na parte do await waitFor, pois quando a 8 passou a 5 deu problema, me ajudarama complementar, https://testing-library.com/docs/dom-testing-library/api-async/ site apoio
    renderWithRouterAndRedux(<Wallet />);
    const coin = screen.getByTestId('currency-input');
    expect(coin).toBeInTheDocument();
    await waitFor(() => {
      userEvent.selectOptions(coin, 'USD');
      expect(screen.getByRole('button', { name: 'Adicionar despesa' })).toBeVisible();
    });
  });
});
