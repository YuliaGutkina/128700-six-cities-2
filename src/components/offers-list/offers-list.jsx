import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {OfferCard} from "../offer-card/offer-card";

export class OffersList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: {}
    };

    this._cardHoverHandler = this._cardHoverHandler.bind(this);
    this._cardHoverEndHandler = this._cardHoverEndHandler.bind(this);
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
        onHoverEnd={this._cardHoverEndHandler}
      />)}
    </div>;
  }

  _cardHoverHandler(evt, offerData) {
    this.setState({
      activeCard: offerData
    });
  }

  _cardHoverEndHandler() {
    this.setState({
      activeCard: {}
    });
  }
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        type: PropTypes.oneOf([`Apartment`, `Private room`, `House`, `Hotel`]).isRequired,
        isPremium: PropTypes.bool,
        src: PropTypes.string,
        price: PropTypes.number,
        rating: PropTypes.number
      })
  ),
  onCardTitleClick: PropTypes.func.isRequired
};
