import React from 'react';
import PropTypes from "prop-types";
import moment from "moment";
import {Rating} from "../rating/rating";


export const Review = (props) => {
  const {commentData} = props;

  return <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={commentData.user.avatar} width={54} height={54} alt="Reviews avatar" />
      </div>
      <span className="reviews__user-name">
        {commentData.user.name}
      </span>
    </div>
    <div className="reviews__info">
      <Rating
        className="reviews__rating"
        starsClassName="reviews__stars"
        value={commentData.rating}
      />
      <p className="reviews__text">
        {commentData.comment}
      </p>
      <time className="reviews__time" dateTime={moment(commentData.date).format()}>{moment(commentData.date).format(`MMMM YYYY`)}</time>
    </div>
  </li>;
};

Review.propTypes = {
  commentData: PropTypes.object
};
