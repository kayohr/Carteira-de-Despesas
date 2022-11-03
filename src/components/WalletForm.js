import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEconomy, fetchValue } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchEconomy());
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  acessButton = () => {
    const { dispatch } = this.props;

    dispatch(fetchValue(this.state));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { value, description, currency,
      method, tag } = this.state;
    const { currencies } = this.props;

    return (
      <div>
        <input
          data-testid="value-input"
          placeholder="Adicionar despesa"
          value={ value }
          name="value"
          onChange={ this.handleChange }
        />
        <br />
        <input
          data-testid="description-input"
          placeholder=" Descrição da despesa "
          value={ description }
          name="description"
          onChange={ this.handleChange }
        />
        <br />
        <select
          data-testid="currency-input"
          value={ currency }
          name="currency"
          onChange={ this.handleChange }

        >
          { currencies.filter((e) => e !== 'USDT')
            .map((walletCoin) => (
              <option key={ walletCoin }>
                { walletCoin}

              </option>))}
        </select>
        <br />
        <select
          data-testid="method-input"
          value={ method }
          name="method"
          onChange={ this.handleChange }

        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>

        </select>
        <br />
        <select
          data-testid="tag-input"
          value={ tag }
          name="tag"
          onChange={ this.handleChange }

        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <br />
        <button
          text="Adicionar despesa"
          type="button"
          onClick={ this.acessButton }
        >
          Adicionar despesa

        </button>
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
