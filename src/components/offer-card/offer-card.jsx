import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import {Link, withRouter} from "react-router-dom";

import Bookmark from "../bookmark/bookmark";


class OfferCard extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {offer, onHover = () => {}, cardClassName, imageWrapperClassName, cardInfoClassName, imageWidth, imageHeight} = this.props;

    return <article
      className={classNames(`place-card`, cardClassName)}
      onMouseEnter={() => {
        onHover(offer);
      }}
      onMouseLeave={() => {
        onHover(null);
      }}
    >
      {offer.isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      }
      <div className={classNames(`place-card__image-wrapper`, imageWrapperClassName)}>
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.preview} width={imageWidth} height={imageHeight} alt="Place image" />
        </Link>
      </div>
      <div className={classNames(`place-card__info`, cardInfoClassName)}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <Bookmark
            offer={offer}
            className="place-card__bookmark-button"
            iconClassName="place-card__bookmark-icon"
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(offer.rating) * 20}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>;
  }

  componentWillUnmount() {
    const {onHover} = this.props;

    onHover(null);
  }
}

OfferCard.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number,
    city: PropTypes.shape({
      name: PropTypes.string,
      location: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        zoom: PropTypes.number
      })
    }),
    preview: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    isFavorite: PropTypes.bool,
    isPremium: PropTypes.bool,
    rating: PropTypes.number,
    type: PropTypes.string,
    bedrooms: PropTypes.number,
    maxAdults: PropTypes.number,
    price: PropTypes.number,
    goods: PropTypes.arrayOf(PropTypes.string),
    host: PropTypes.shape({
      id: PropTypes.number,
      isPro: PropTypes.bool,
      name: PropTypes.string,
      avatar: PropTypes.string
    }),
    description: PropTypes.string,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      zoom: PropTypes.number
    })
  }),
  onHover: PropTypes.func.isRequired,
  cardClassName: PropTypes.string,
  imageWrapperClassName: PropTypes.string,
  cardInfoClassName: PropTypes.string,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
};


export {OfferCard};
export default (withRouter(OfferCard));
