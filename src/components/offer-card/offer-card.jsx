import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";

import {Operation} from "../../reducer/data/data";
import {receiveUserDataSelector} from "../../reducer/user/selectors";


class OfferCard extends PureComponent {
  constructor(props) {
    super(props);

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  render() {
    const {offer, onHover, cardClassName, imageWrapperClassName, cardInfoClassName, imageWidth, imageHeight} = this.props;

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
          <button
            className={classNames(
                `button`,
                `place-card__bookmark-button`,
                {"place-card__bookmark-button--active": offer.isFavorite}
            )}
            type="button"
            onClick={this._handleFavoriteClick}
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
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>;
  }

  _handleFavoriteClick() {
    const {offer, userData, history, onFavoriteClick} = this.props;

    if (!userData) {
      history.push(`/login`);
    }

    onFavoriteClick(offer);
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
  onFavoriteClick: PropTypes.func.isRequired,
  userData: PropTypes.object,
  cardClassName: PropTypes.string,
  imageWrapperClassName: PropTypes.string,
  cardInfoClassName: PropTypes.string,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  history: PropTypes.object
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  userData: receiveUserDataSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  onFavoriteClick: (offer) => {
    dispatch(Operation.toggleFavoriteStatus(offer));
  },
});


export {OfferCard};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OfferCard));
