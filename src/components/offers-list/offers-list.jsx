import React from 'react';
import PropTypes from "prop-types";
import {OfferCard} from "../offer-card/offer-card";


export const OffersList = (props) => {
  const {places, onCardTitleClick, onSetActive} = props;

  return <div className="cities__places-list places__list tabs__content">
    {places.map((offer) => <OfferCard
      key={offer.id}
      offer={offer}
      onTitleClick={onCardTitleClick}
      onHover={(item) => {
        onSetActive(item);
      }}
    />)}
  </div>;
};


OffersList.propTypes = {
  places: PropTypes.arrayOf(
      OfferCard.propTypes.offer
  ),
  onCardTitleClick: PropTypes.func.isRequired,
  onSetActive: PropTypes.func
};
