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
      user: null, // state inicial do nome de usuario que sera renderizado na tela, só mudará quando salvo na página de login.
      isLoading: false, // status inicial pagina de carregamento - Carregando ...
    };
  }

  componentDidMount() { // pertence ao ciclo de vida do componente fase de montagem.
    this.getUser(); // é chamado apenas uma vez, logo após o render, assim que a paǵina é carregada.
  } // neste caso, ele executará a função getuser. Resgatará o nome do usuário salvo na página de login.

  // usada uma das formas de escrever o setState --> recebe um objeto e uma callback como parametro.
  async getUser() { // funcao para recuperar as informações da pessoa usuária.
    this.setState({ isLoading: true }, // ao clicar em salvar, a pagina de carregamento é acionada até o momento em que a getUser é retornada.
      async () => {
        const user = await userAPI.getUser(); // getUser é chamada e seu retorno será armazenado na constante user(mesmo nome state);
        this.setState({ // após seu retorno, carregamento é cessado e a página é redirecionada.
          isLoading: false,
          user, // state recebe os dados retornados da API que estará armazenados numa constante de mesmo nome.
        });
      });
  }

  render() {
    const { isLoading, user } = this.state; // desestruturação states.
    if (isLoading) return <Loading />; // renderização condicional para a página de carregamento.
    if (user === null) return null; // caso user do state não tenha nenhum usuário cadastrado , o componente será renderizado.
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
