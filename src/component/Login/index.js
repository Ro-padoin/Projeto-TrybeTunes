import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as userAPI from '../../services/userAPI';
import Loading from '../Loading';

class Login extends Component {
  constructor() {
    super();

    this.handleClickSave = this.handleClickSave.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      isDisabled: true,
      isLoading: false,
      name: '',
      redirect: false,
    };
  }

  handleChange({ target }) {
    const { name, value, minLength } = target;
    this.setState({
      [name]: value,
      isDisabled: (value.length < minLength),
    });
  }

  async handleClickSave() {
    const { name } = this.state;
    this.setState({ isLoading: true },
      async () => {
        await userAPI.createUser({ name });
        this.setState({
          isLoading: false,
          redirect: true,
        });
      });
  }

  render() {
    const { isDisabled, name, isLoading, redirect } = this.state;
    if (isLoading) return <Loading />;
    if (redirect) return <Redirect to="/search" />;
    return (
      <section data-testid="page-login">
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            data-testid="login-name-input"
            id="name"
            name="name"
            value={ name }
            minLength="3"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ isDisabled }
          onClick={ this.handleClickSave }
        >
          Entrar
        </button>
      </section>
    );
  }
}

export default Login;
