import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  // componentDidMount() {
  //   const { dispatch } = this.props;

  //   dispatch(fetchEconomy());
  // }

  render() {
    const { expenses } = this.props;
    // console.log(espenses);
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir.</th>
          </tr>
        </thead>
        {/* https://edrodrigues.com.br/blog/criando-tabelas-com-filtros-%E2%80%8B%E2%80%8Busando-react/ && https://www.youtube.com/watch?v=4liMA_4lubI   Site de apoio */}
        <tbody>
          {expenses.map((item) => (
            <tr key={ item.id }>
              <td>{item.description}</td>
              <td>{item.tag}</td>
              <td>{item.method}</td>
              <td>{parseFloat(item.value).toFixed(2)}</td>
              <td>{item.exchangeRates[item.currency].name}</td>
              <td>{parseFloat(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
              <td>
                {(item.exchangeRates[item.currency].ask
              * parseFloat(item.value)).toFixed(2)}

              </td>
              <td>Real</td>
              <td> Editar/Excluir </td>
            </tr>
          ))}
        </tbody>

      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
