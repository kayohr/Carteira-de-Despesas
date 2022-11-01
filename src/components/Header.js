import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <form>
        <div
          data-testid="email-field"
        >
          {email}
        </div>
        <div
          data-testid="total-field"
        >
          0
        </div>
        <div
          data-testid="header-currency-field"
        >
          BRL
        </div>
        Header
      </form>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};
const mapStateToProps = (action) => ({
  email: action.user.email,
});

export default connect(mapStateToProps)(Header);
