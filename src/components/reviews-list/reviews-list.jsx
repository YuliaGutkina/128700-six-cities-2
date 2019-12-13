import React from 'react';
// import PropTypes from "prop-types";
// import {connect} from "react-redux";

import {Review} from "../review/review";


const ReviewsList = () => {
  return <ul className="reviews__list">
    <Review/>
  </ul>;
};


export {ReviewsList};
