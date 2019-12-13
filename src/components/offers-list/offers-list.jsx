import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import OfferCard from "../offer-card/offer-card";
import {ActionCreator} from "../../reducer/data/data";


const OffersList = (props) => {
  const {places, onSetActive, cardClassName, imageWrapperClassName, cardInfoClassName, imageWidth, imageHeight, onSetActiveOffer} = props;

  return <>
    {places.map((offer) => <OfferCard
      cardClassName={cardClassName}
      imageWrapperClassName={imageWrapperClassName}
      cardInfoClassName={cardInfoClassName}
      imageWidth={imageWidth}
      imageHeight={imageHeight}
      key={offer.id}
      offer={offer}
      onHover={(item) => {
        onSetActive(item);
        onSetActiveOffer(item);
      }}
    />)}
  </>;
};

OffersList.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object),
  // activeItem: PropTypes.object,
  onSetActive: PropTypes.func,
  onSetActiveOffer: PropTypes.func,
  cardClassName: PropTypes.string,
  imageWrapperClassName: PropTypes.string,
  cardInfoClassName: PropTypes.string,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number
};

const mapDispatchToProps = (dispatch) => ({
  onSetActiveOffer: (item) => {
    dispatch(ActionCreator.setActiveOffer(item));
  },
});


export {OffersList};
export default connect(null, mapDispatchToProps)(OffersList);
