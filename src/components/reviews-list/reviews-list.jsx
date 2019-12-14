import React from 'react';
import PropTypes from "prop-types";

import {Review} from "../review/review";


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
  comments: PropTypes.array
};
