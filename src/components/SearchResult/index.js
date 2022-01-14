import React, { Component } from 'react';

// API:
import { Link } from 'react-router-dom';

// PropTypes:
import PropTypes from 'prop-types';

class SearchResult extends Component {
  render() {
    const {
      albuns,
      artist,
      shouldResultSearch,
    } = this.props;

    if (albuns.length === 0) return 'Nenhum álbum foi encontrado';

    return (
      <section>
        {shouldResultSearch && (
          <h2>
            {`Resultado de álbuns de: ${artist}`}
          </h2>)}

        {albuns.map(({
          artistId,
          artworkUrl100,
          artistName,
          collectionName,
          collectionId,
        }) => (
          <div key={ artistId }>
            <img src={ artworkUrl100 } alt={ artistName } />
            <h3>{artistName}</h3>
            <p>{collectionName}</p>
            <Link
              to={ `/album/${collectionId}` }
              data-testid={ `link-to-album-${collectionId}` }
            >
              Album
            </Link>
          </div>
        ))}
      </section>
    );
  }
}

SearchResult.propTypes = {
  albuns: PropTypes.arrayOf(PropTypes.objectOf),
  artist: PropTypes.string,
  shouldResultSearch: PropTypes.bool,
}.isRequired;

export default SearchResult;
