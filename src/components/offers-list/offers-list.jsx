import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {OfferCard} from "../offer-card/offer-card";

export class OffersList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null
    };

    this._cardHoverHandler = this._cardHoverHandler.bind(this);
  }

  render() {
    const {offers, onCardTitleClick} = this.props;
    return <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <OfferCard
        key={offer.title}
        offer={offer}
        onTitleClick={onCardTitleClick}
        onHover={(evt) => {
          this._cardHoverHandler(evt, offer);
        }}
      />)}
    </div>;
  }

  _cardHoverHandler(evt, offerData) {
    this.setState({
      activeCard: evt ? offerData : null
    });
  }
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(
      OfferCard.propTypes.offer
  ),
  onCardTitleClick: PropTypes.func.isRequired
};
