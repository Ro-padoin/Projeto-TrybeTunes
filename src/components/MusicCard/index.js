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
    this.handleChangeFavorite = this.handleChangeFavorite.bind(this);
    this.addFavoriteSong = this.addFavoriteSong.bind(this);

    const { album } = props;

    this.state = {
      isLoading: false,
      favorites: album.map(() => false),
    };
  }

  handleChangeFavorite(index, { target }) {
    const { album } = this.props;
    const { checked } = target;
    this.setState(({ favorites }) => {
      favorites[index] = checked;
      return {
        favorites: [...favorites],
      };
    });
    if (checked) this.addFavoriteSong(album[index]);
  }

  async addFavoriteSong(music) {
    this.setState({ isLoading: true },
      async () => {
        await favoriteSongs.addSong(music);
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { isLoading, favorites } = this.state;
    const { album } = this.props;
    if (isLoading) return <Loading />;
    return (
      <section>
        {album.map(({ trackId, trackName, previewUrl }, i) => (
          <div key={ trackId }>
            <span>{trackName}</span>
            <label htmlFor="favorite">
              Favorita:
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                id="favorite"
                name="favorite"
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
