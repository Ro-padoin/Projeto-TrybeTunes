import React, { Component } from 'react';

// PropTypes:
import PropTypes from 'prop-types';

// API:
import getMusics from '../../services/musicsAPI';

// Components:
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import MusicCard from '../../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.fetchAlbumDetails = this.fetchAlbumDetails.bind(this);

    this.state = {
      album: [],
    };
  }

  componentDidMount() {
    this.fetchAlbumDetails();
  }

  async fetchAlbumDetails() {
    const { match: { params: { id } } } = this.props;
    const album = await getMusics(id);
    this.setState({ album: [...album] });
  }

  render() {
    const { album } = this.state;
    if (album.length === 0) return <Loading />;
    const { artistName, collectionName } = album[0];
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h3 data-testid="artist-name">{artistName}</h3>
          <h4 data-testid="album-name">{collectionName}</h4>
          <MusicCard album={ album.slice(1) } />
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
}.isRequired;

export default Album;
