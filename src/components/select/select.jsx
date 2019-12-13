import React from 'react';
import PropTypes from "prop-types";


export const Select = (props) => {
  const {onChange, defaultValue, options, className, optionClassName, id} = props;

  const _handleChange = (e) => {
    onChange(e.target.value);
  };

  return <select
    onChange={_handleChange}
    value={defaultValue}
    className={className}
    id={id}
  >
    {options.map((option) => <option
      key={option.value}
      className={optionClassName}
      value={option.value}>
      {option.text}
      t</option>
    )}
  </select>;
};

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  optionClassName: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
};
