import React, { Component } from 'react';

// Components:
import Header from '../../components/Header';
import InputText from '../../components/InputText';

const MIN_CHAR = 2;

class Search extends Component {
  constructor() {
    super();

    this.handleChangeSearch = this.handleChangeSearch.bind(this);

    this.state = {
      inputSearch: '', // state inicial do value do input;
      isDisabled: true, // state inicial do botao Salvar - desabilitado;
    };
  }

  handleChangeSearch({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value, // novo state - input search recebe o valor digitado.
      isDisabled: (value.length < MIN_CHAR), // condicao para habilitar o botao Salvar.
    });
  }

  render() {
    const { inputSearch, isDisabled } = this.state;
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
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
