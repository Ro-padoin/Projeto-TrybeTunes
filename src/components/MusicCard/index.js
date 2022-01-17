import React, { Component } from 'react';

// PropTypes:
import PropTypes from 'prop-types';

// API:
import * as favoriteSongs from '../../services/favoriteSongsAPI';

// Components:
import Loading from '../Loading';

class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.addFavoriteSong = this.addFavoriteSong.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.handleChangeFavorite = this.handleChangeFavorite.bind(this);
    this.removeSong = this.removeSong.bind(this);

    const { album } = props; // recebe a props quando o album este é chamado na page album.

    this.state = {
      isLoading: false,
      favorites: album.map(() => false), // atribuição para todas as musicas do album um elemento de favoritas como falso. Pois neste momento as musicas não estarão favoritadas ainda.
    };
  }

  componentDidMount() {
    this.getFavorites(); // recupera a lista de musicas favoritadas pelo usuário.
  }

  // funcao para capturar o checked do checkBox quando a musica for favoritada.
  handleChangeFavorite(index, { target }) { // recebe index e o event, que neste caso quero o target.
    const { album, onRemove } = this.props; // props recebidas album --> Album e onRemove --> Favorites
    const { checked } = target; // desestruturação do checked --> true ou false
    this.setState(({ favorites }) => { // desestruturo favorites de prevState
      favorites[index] = checked; // favorites na posicao do index seré igual ao valor do checked capturado pelo event no momento do clique
      return {
        favorites: [...favorites], // favorites recebe um novo array com os valores de true ou false na posicao de cada musica do album.
      };
    });
    if (checked) this.addFavoriteSong(album[index]); // se checked for true, chamará a função de adicionar as favoritas passando o album na posicao index.

    // se for false (inicial ou desmarcado) chamara a funcao de remover das favoritas, passando o album na posicao index como parametro. Se a funcao onRemove for diferente de undefined, esta será chamada com album na posicao index como parametro.
    if (!checked) {
      this.removeSong(album[index]);
      if (onRemove !== undefined) {
        onRemove(album[index]);
      }
    }
  }

  // funcao que resgata as musicas favoritadas ao abrir a paǵina das musicas do album.

  async getFavorites() {
    const { album } = this.props;
    this.setState({ isLoading: true },
      async () => {
        // se o resultado da funcao assincrona atender as condicoes, sera feito uma verificação no album de algum item em que os ids se igualam.
        const getFavorites = await favoriteSongs.getFavoriteSongs();
        if (getFavorites !== undefined && getFavorites.length !== 0) {
          const checkFavorites = album.map((item) => (
            getFavorites.some((element) => item.trackId === element.trackId)
          ));
          this.setState({
            favorites: [...checkFavorites], // favorite recebe um novo array com true e false
            isLoading: false,
          });
        } else {
          // senao somente sera alterado o carregamento da pagina.
          this.setState({ isLoading: false });
        }
      });
  }

  // funcao que add a musica como favorita ao clicar no checkBox
  async addFavoriteSong(music) {
    this.setState({ isLoading: true },
      async () => {
        await favoriteSongs.addSong(music);
        this.setState({ isLoading: false });
      });
  }

  // funcao que remove a musica como favorita ao desmarcar o checkBox
  async removeSong(music) {
    this.setState({ isLoading: true },
      async () => {
        await favoriteSongs.removeSong(music);
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { isLoading, favorites } = this.state;
    const { album } = this.props;
    if (album.length === 0 || album === undefined) {
      return 'Nenhum item na lista de músicas favoritas.';
    }
    if (isLoading) return <Loading />;
    return (
      <section>
        {album.map(({ trackId, trackName, previewUrl }, i) => (
          <div key={ trackId }>
            <span>{trackName}</span>
            <label htmlFor="favorite">
              Favorita
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                id="favorite"
                name="favorites"
                checked={ favorites[i] }
                onChange={ (event) => {
                  this.handleChangeFavorite(i, event);
                } }
              />
            </label>
            <div>
              <audio
                data-testid="audio-component"
                src={ previewUrl }
                controls
              >
                <track kind="captions" />
              </audio>
            </div>
          </div>
        ))}
      </section>
    );
  }
}

MusicCard.propTypes = {
  album: PropTypes.arrayOf(PropTypes.objectOf),
}.isRequired;

export default MusicCard;
