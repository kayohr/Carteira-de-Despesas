import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  // componentDidMount() {
  //   const { dispatch } = this.props;

  //   dispatch(fetchEconomy());
  // }
  sumExchange = () => {
    const { sumTotal } = this.props;
    const calculoExchange = sumTotal.reduce((acc, curr) => {
      const valueCambio = curr.exchangeRates[curr.currency].ask;
      acc += valueCambio * curr.value;
      return acc;
    }, 0);
    return parseFloat(calculoExchange).toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <header className="color">
        <p
          className="test"
          data-testid="email-field"
        >
          {email}
        </p>
        <p
          className="test"
          data-testid="total-field"
        >
          {' '}
          {' Total de despesas ' }
          { this.sumExchange() }
        </p>
        <p
          data-testid="header-currency-field"
          className="test"

        >
          /BRL
        </p>

      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  // expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  // dispatch: PropTypes.func.isRequired,
  sumTotal: PropTypes.arrayOf(Object).isRequired,
};
const mapStateToProps = (action) => ({
  email: action.user.email,
  // expenses: store.wallet.expenses,
  sumTotal: action.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
