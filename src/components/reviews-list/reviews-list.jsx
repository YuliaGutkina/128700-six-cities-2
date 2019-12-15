import React from 'react';
import PropTypes from "prop-types";

import {Review} from "../review/review";
import {ComplexPropType} from "../../types/types";


export const ReviewsList = (props) => {
  const {comments} = props;

  return <ul className="reviews__list">
    {comments.map((item) => <Review
      key={item.id}
      commentData={item}
    />)}
  </ul>;
};

ReviewsList.propTypes = {
  comments: PropTypes.arrayOf(ComplexPropType.COMMENT)
};
