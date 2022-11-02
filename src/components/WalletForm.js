import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEconomy } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchEconomy());
  }

  render() {
    const { currencies } = this.props;

    return (
      <div>
        <input
          data-testid="value-input"
          placeholder="Adicionar despesa"
        />
        <br />
        <input
          data-testid="description-input"
          placeholder=" Descrição da despesa "
        />
        <br />
        <select
          data-testid="currency-input"
        >
          { currencies.filter((e) => e !== 'USDT')
            .map((walletCoin) => (
              <option key={ walletCoin }>
                { walletCoin}
                { console.log(walletCoin)}
              </option>))}
        </select>
        <br />
        <select
          data-testid="method-input"
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>

        </select>
        <br />
        <select
          data-testid="tag-input"
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
