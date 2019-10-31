import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {OfferCard} from "../offer-card/offer-card";

export class OffersList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: ``
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
        onHover={this._cardHoverHandler}
      />)}
    </div>;
  }

  _cardHoverHandler(evt) {
    this.setState({
      activeCard: evt.currentTarget
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
