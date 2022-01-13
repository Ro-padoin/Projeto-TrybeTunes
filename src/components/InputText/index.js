import React, { Component } from 'react';

// PropTypes:
import PropTypes from 'prop-types';

class InputText extends Component {
  render() {
    const {
      textLabel,
      id,
      name,
      type,
      value,
      onChange: handleChange,
      dataTestId,
    } = this.props;

    return (
      <label htmlFor={ id }>
        {textLabel}
        <input
          type={ type }
          id={ id }
          name={ name }
          value={ value }
          onChange={ handleChange }
          data-testid={ dataTestId }
        />
      </label>
    );
  }
}

InputText.propTypes = {
  textLabel: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  dataTestId: PropTypes.string,
}.isRequired;

export default InputText;
