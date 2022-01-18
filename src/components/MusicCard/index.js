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
      favorites: album.map(() => false),
    };
  }

  // Requisito 9
  componentDidMount() {
    this.getFavorites();
  }

  // Requisito 8
  handleChangeFavorite(index, { target }) {
    const { album, onRemove } = this.props;
    const { checked } = target;
    this.setState(({ favorites }) => {
      favorites[index] = checked;
      return {
        favorites: [...favorites],
      };
    });
    if (checked) this.addFavoriteSong(album[index]);

    // usada no requisito 11
    if (!checked) {
      this.removeSong(album[index]);
      // Requisito 12
      if (onRemove !== undefined) {
        onRemove(album[index]);
      }
    }
  }

  // Requisito 9
  async getFavorites() {
    const { album } = this.props;
    this.setState({ isLoading: true },
      async () => {
        const getFavorites = await favoriteSongs.getFavoriteSongs();
        if (getFavorites !== undefined && getFavorites.length !== 0) {
          const checkFavorites = album.map((item) => (
            getFavorites.some((element) => item.trackId === element.trackId)
          ));
          this.setState({
            favorites: [...checkFavorites],
            isLoading: false,
          });
        } else {
          this.setState({ isLoading: false });
        }
      });
  }

  // Requisito 8
  async addFavoriteSong(music) {
    this.setState({ isLoading: true },
      async () => {
        await favoriteSongs.addSong(music);
        this.setState({ isLoading: false });
      });
  }

  // Requisito 9, 10,11
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
