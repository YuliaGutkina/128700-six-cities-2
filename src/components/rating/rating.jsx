import React from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";


export const Rating = (props) => {
  const {value, className, starsClassName, valueClassName, isValueVisible} = props;

  return <div className={classNames(`rating`, className)}>
    <div className={classNames(`rating__stars`, starsClassName)}>
      <span style={{width: `${Math.round(value) * 20}%`}} />
      <span className="visually-hidden">Rating</span>
    </div>
    {isValueVisible &&
      <span className={classNames(`rating__value`, valueClassName)}>{value}</span>
    }
  </div>;
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
  valueClassName: PropTypes.string,
  starsClassName: PropTypes.string,
  isValueVisible: PropTypes.bool,
};
