import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { addUser } from '../redux/actions';

const number = 6;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    buttonDisable: true,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    }, this.validateButton);
  };

  validateButton = () => {
    const { email, password } = this.state;
    const senha = password.length >= number;
    const acessEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/i;
    const validateEmail = acessEmail.test(email);
    const enable = senha && validateEmail;
    this.setState({
      buttonDisable: !enable,
    });
  };

  submitLogin = (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(addUser(email));
    history.push('/carteira');
  };

  render() {
    const { buttonDisable } = this.state;
    return (
      <div className="fundo">

        {/* <div className="login"> */}
        <form
          className="login imagem"
          onSubmit={ this.submitLogin }
        >
          {/* Login */}
          <input
            className="fonte"
            placeholder="Digite o seu email aqui"
            data-testid="email-input"
            name="email"
            type="text"
            onChange={ this.handleChange }
          />

          <input
            className="fonte"
            data-testid="password-input"
            name="password"
            type="password"
            placeholder="Digite o seu password aqui"
            onChange={ this.handleChange }
          />

          <button
            className="fonte"
            type="submit"
            disabled={ buttonDisable }
          >
            Entrar
          </button>
        </form>
      </div>
      // </div>

    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
