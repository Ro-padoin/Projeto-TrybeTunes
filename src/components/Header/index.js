import React, { Component } from 'react';

// React-Router:
import { Link } from 'react-router-dom';

// API:
import * as userAPI from '../../services/userAPI';

// Components:
import Loading from '../Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      user: null, // state inicial do nome de usuario que sera renderizado na tela.
      isLoading: false, // status inicial pagina de carregamento - Carregando ...
    };
  }

  componentDidMount() {
    this.getUser();
  }

  async getUser() {
    this.setState({ isLoading: true }, // ao clicar em salvar a pagina de carregamento é acionada até o momento em que a createUser é retornada.
      async () => {
        const user = await userAPI.getUser(); // getUser é chamada e seu retorno será armazenado na constante user(mesmo nome state);
        this.setState({ // após seu retorno carregamento é cessado e a página é redirecionada.
          isLoading: false,
          user,
        });
      });
  }

  render() {
    const { isLoading, user } = this.state;
    if (isLoading) return <Loading />;
    if (user === null) return null;
    return (
      <header data-testid="header-component">
        <section>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </section>
        <p data-testid="header-user-name">{user.name}</p>
      </header>
    );
  }
}

export default Header;
