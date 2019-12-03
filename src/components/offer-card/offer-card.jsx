import React from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import {connect} from "react-redux";

import {Operation} from "../../reducer/data/data";


const OfferCard = (props) => {
  const {offer, onTitleClick, onFavoriteClick, onHover} = props;

  return <article
    className="cities__place-card place-card"
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
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img className="place-card__image" src={offer.preview} width={260} height={200} alt="Place image" />
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">€{offer.price}</b>
          <span className="place-card__price-text">/&nbsp;night</span>
        </div>
        <button
          className={classNames(
              `button`,
              `place-card__bookmark-button`,
              {"place-card__bookmark-button--active": offer.isFavorite}
          )}
          type="button"
          onClick={() => {
            onFavoriteClick(offer);
          }}
        >
          <svg className="place-card__bookmark-icon" width={18} height={19}>
            <use xlinkHref="#icon-bookmark" />
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `${offer.rating}%`}} />
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a href="#" onClick={onTitleClick}>{offer.title}</a>
      </h2>
      <p className="place-card__type">{offer.type}</p>
    </div>
  </article>;
};

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
  onTitleClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,
  onFavoriteClick: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {});

const mapDispatchToProps = (dispatch) => ({
  onFavoriteClick: (offer) => {
    dispatch(Operation.toggleFavoriteStatus(offer));
  },
});


export {OfferCard};
export default connect(mapStateToProps, mapDispatchToProps)(OfferCard);
