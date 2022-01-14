import React, { Component } from 'react';

// PropTypes:
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { album } = this.props;
    return (
      <section>
        {album.map(({ trackNumber, trackName, previewUrl }) => (
          <>
            <span>{trackName}</span>
            <div key={ trackNumber }>
              <audio
                data-testid="audio-component"
                src={ previewUrl }
                controls
              >
                <track kind="captions" />
              </audio>
            </div>
          </>
        ))}
      </section>
    );
  }
}

MusicCard.propTypes = {
  album: PropTypes.arrayOf(PropTypes.objectOf),
}.isRequired;

export default MusicCard;
