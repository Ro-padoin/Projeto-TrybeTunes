import React, { Component } from 'react';

// API:
import * as favoriteSongsAPI from '../../services/favoriteSongsAPI';

// Components:
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import MusicCard from '../../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();

    this.getFavoriteSongs = this.getFavoriteSongs.bind(this);
    this.onRemove = this.onRemove.bind(this);

    this.state = {
      isLoading: false,
      favoriteList: [],
    };
  }

  componentDidMount() {
    this.getFavoriteSongs();
  }

  onRemove(music) {
    const { favoriteList } = this.state;
    this.setState(() => {
      const remainingSongs = favoriteList
        .filter((item) => item.trackId !== music.trackId);
      return {
        favoriteList: [...remainingSongs],
      };
    });
  }

  async getFavoriteSongs() {
    this.setState({ isLoading: true },
      async () => {
        const getFavoriteList = await favoriteSongsAPI.getFavoriteSongs();
        this.setState({
          favoriteList: [...getFavoriteList],
          isLoading: false,
        });
      });
  }

  render() {
    const { isLoading, favoriteList } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-favorites">
        <Header />
        <MusicCard
          album={ favoriteList }
          onRemove={ this.onRemove }
        />
      </div>
    );
  }
}

export default Favorites;
