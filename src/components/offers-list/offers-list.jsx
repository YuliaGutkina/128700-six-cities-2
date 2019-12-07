import React from 'react';
import PropTypes from "prop-types";
import OfferCard from "../offer-card/offer-card";


export const OffersList = (props) => {
  const {places, onSetActive, cardClassName, imageWrapperClassName, cardInfoClassName, imageWidth, imageHeight} = props;

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
      }}
    />)}
  </>;
};


OffersList.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object),
  onSetActive: PropTypes.func,
  cardClassName: PropTypes.string,
  imageWrapperClassName: PropTypes.string,
  cardInfoClassName: PropTypes.string,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number
};
