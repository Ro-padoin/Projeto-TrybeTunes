import React, { Component } from 'react';

// React-Router:
import { Redirect } from 'react-router-dom';

// API:
import * as userAPI from '../../services/userAPI';

// Components:
import InputText from '../../components/InputText';
import Loading from '../../components/Loading';

const MIN_LENGTH = 3;

class Login extends Component {
  constructor() {
    super();

    this.handleClickSave = this.handleClickSave.bind(this);
    this.handleChangeLogin = this.handleChangeLogin.bind(this);

    this.state = {
      isDisabled: true,
      isLoading: false,
      nameLogin: '',
      redirect: false,
    };
  }

  handleChangeLogin({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
      isDisabled: (value.length < MIN_LENGTH),
    });
  }

  async handleClickSave() {
    const { nameLogin: name } = this.state;
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
    const { isDisabled, nameLogin: name, isLoading, redirect } = this.state;
    if (isLoading) return <Loading />;
    if (redirect) return <Redirect to="/search" />;
    return (
      <div data-testid="page-login">
        <form>
          <InputText
            textLabel="Nome: "
            type="text"
            dataTestId="login-name-input"
            id="login"
            name="nameLogin"
            value={ name }
            onChange={ this.handleChangeLogin }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ isDisabled }
            onClick={ this.handleClickSave }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
