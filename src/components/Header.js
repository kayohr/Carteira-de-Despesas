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

  // ddd = () => {
  //   const { sumTotal } = this.props;
  //   const calc = sumTotal.reduce((acc, curr) => {
  //     const valueTaxa = curr.exchangeRates[curr.currency].ask;
  //     acc += Number(valueTaxa * curr.value);
  //     return acc;
  //   }, 0);
  //   return calc.toFixed(2);
  // };

  render() {
    const { email } = this.props;
    return (
      <header>
        <p
          data-testid="email-field"
        >
          {email}
        </p>
        <p
          data-testid="total-field"
        >
          { this.sumExchange() }
        </p>
        <p
          data-testid="header-currency-field"
        >
          BRL
        </p>

      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  // expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  // dispatch: PropTypes.func.isRequired,
  sumTotal: PropTypes.arrayOf(PropTypes.string).isRequired,
};
const mapStateToProps = (action) => ({
  email: action.user.email,
  // expenses: store.wallet.expenses,
  sumTotal: action.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
