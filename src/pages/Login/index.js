import React, { Component } from 'react';

// React-Router:
import { Redirect } from 'react-router-dom';

// API:
import * as userAPI from '../../services/userAPI';

// Components:
import Loading from '../../components/Loading';

class Login extends Component {
  constructor() {
    super();

    this.handleClickSave = this.handleClickSave.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      isDisabled: true, // condicao inicial botao Salvar - desabilitado;
      isLoading: false, // condicao inicial da pagina de loading - Carregando...
      name: '', // value input name
      redirect: false, // condicao inicial de redirecionamento da pagina.
    };
  }

  handleChange({ target }) {
    const { name, value, minLength } = target;
    this.setState({
      [name]: value, // novo state - input name recebe o valor digitado.
      isDisabled: (value.length < minLength), // condicao para habilitar o botao Salvar.
    });
  }

  async handleClickSave() {
    const { name } = this.state;
    this.setState({ isLoading: true }, // ao clicar em salvar a pagina de carregamento é acionada até o momento em que a createUser é retornada.
      async () => {
        await userAPI.createUser({ name }); // createuser é chamada recebendo o state name
        this.setState({ // após seu retorno carregamento é cessado e a página é redirecionada.
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
