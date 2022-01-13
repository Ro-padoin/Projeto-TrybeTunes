import React, { Component } from 'react';

// API:
import searchAlbumsAPI from '../../services/searchAlbumsAPI';

// Components:
import Header from '../../components/Header';
import InputText from '../../components/InputText';
import Loading from '../../components/Loading';

const MIN_CHAR = 2;

class Search extends Component {
  constructor() {
    super();

    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleClickSearch = this.handleClickSearch.bind(this);

    this.state = {
      inputSearch: '', // state inicial do value do input;
      isDisabled: true, // state inicial do botao Salvar - desabilitado;
      isLoading: false, // condicao inicial da pagina de loading - Carregando...
    };
  }

  handleChangeSearch({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value, // novo state - input search recebe o valor digitado.
      isDisabled: (value.length < MIN_CHAR), // condicao para habilitar o botao Salvar.
    });
  }

  async handleClickSearch() {
    const { inputSearch } = this.state;
    this.setState({ isLoading: true }, // ao clicar em salvar a pagina de carregamento é acionada até o momento em que a createUser é retornada.
      async () => {
        await searchAlbumsAPI({ inputSearch }); // createuser é chamada recebendo o state name
        this.setState({ // após seu retorno carregamento é cessado e a página é redirecionada.
          isLoading: false,
        });
      });
  }

  render() {
    const { inputSearch, isDisabled, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-search">
        <Header />
        <InputText
          textLabel="Pesquisar: "
          type="text"
          dataTestId="search-artist-input"
          id="pesquisa"
          name="inputSearch"
          value={ inputSearch }
          onChange={ this.handleChangeSearch }
        />
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ isDisabled }
          onClick={ this.handleClickSearch }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
