import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editExpensesSucess, fetchEconomy, fetchValue } from '../redux/actions';

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

  // componentDidUpdate(prevStates) {
  //   const { currencies, IdToEdit, editor } = this.props;
  //   // find pra pegar a despesa
  //   const test = currencies.find((e) => e.id === IdToEdit);
  //   // garantir q estou entrando na função pela primeira vez
  //   // dar setstate pra atualizar o componet
  //   this.setState({
  //     editor: true,

  //   });
  //   // prevPorps dentro da linha 21
  //   // prev editor true e props false
  //   // se n tiver if vai estar num loop infinito
  // }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  editButton = () => {
    const { expensesEdit, IdToEdit, dispatch } = this.props;
    // console.log(IdToEdit);
    const newEditExpenses = expensesEdit.map((e) => {
      if (e.id === IdToEdit) {
        // console.log(e.id);
        return {
          ...e,
          ...this.state,
        };
      }
      return e;
    });
    dispatch(editExpensesSucess(newEditExpenses));
    // um deles é string e outro number
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
    const { currencies, editor } = this.props;

    return (
      <div className="test2">
        <input
          data-testid="value-input"
          placeholder="Adicionar despesa"
          value={ value }
          name="value"
          onChange={ this.handleChange }
          type="number"
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
        {
          editor === false

            ? (
              <button
                text="Adicionar despesa"
                type="button"
                onClick={ this.acessButton }
              >
                Adicionar despesa

              </button>)
            : (
              <button
                text="Editar despesa"
                type="button"
                onClick={ () => this.editButton() }
                // value={ IdToEdit }
              >
                Editar despesa

              </button>
            )
        }
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  IdToEdit: PropTypes.number.isRequired,
  editor: PropTypes.bool.isRequired,
  expensesEdit: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
  IdToEdit: store.wallet.idToEdit,
  editor: store.wallet.editor,
  expensesEdit: store.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
