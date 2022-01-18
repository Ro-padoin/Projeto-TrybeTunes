import React, { Component } from 'react';

// API:
import searchAlbumsAPI from '../../services/searchAlbumsAPI';

// Components:
import Header from '../../components/Header';
import InputText from '../../components/InputText';
import Loading from '../../components/Loading';
import SearchResult from '../../components/SearchResult';

const MIN_CHAR = 2;

class Search extends Component {
  constructor() {
    super();

    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleClickSearch = this.handleClickSearch.bind(this);
    this.fetchArtistAlbum = this.fetchArtistAlbum.bind(this);

    this.state = {
      inputSearch: '',
      isDisabled: true,
      isLoading: false,
      shouldForm: true,
      albuns: null,
      searchedArtist: '',
      shouldResultSearch: false,
    };
  }

  handleChangeSearch({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
      isDisabled: (value.length < MIN_CHAR),

    });
  }

  async handleClickSearch() {
    this.setState({
      isLoading: true,
      inputSearch: '',
      shouldForm: false,
      shouldResultSearch: true,
    });
    this.fetchArtistAlbum();
  }

  async fetchArtistAlbum() {
    const { inputSearch } = this.state;
    const albunsEncontrados = await searchAlbumsAPI(inputSearch);
    this.setState({
      isLoading: false,
      shouldForm: true,
      searchedArtist: inputSearch,
      albuns: [...albunsEncontrados],
    });
  }

  render() {
    const {
      inputSearch,
      isDisabled,
      isLoading,
      shouldForm,
      albuns,
      searchedArtist,
      shouldResultSearch,
    } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-search">
        <Header />
        {shouldForm
          && (
            <form>
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
            </form>
          )}
        {albuns !== null
        && <SearchResult
          albuns={ albuns }
          artist={ searchedArtist }
          shouldResultSearch={ shouldResultSearch }
        />}
      </div>

    );
  }
}

export default Search;
