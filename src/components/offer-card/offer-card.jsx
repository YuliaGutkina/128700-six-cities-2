import React from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import {Link} from "react-router-dom";

import Bookmark from "../bookmark/bookmark";
import {Rating} from "../rating/rating";
import {ComplexPropType} from "../../types/types";
import {PropertyType} from "../property-type/property-type";


const OfferCard = (props) => {
  const {offer, onHover = () => {}, cardClassName, imageWrapperClassName, cardInfoClassName, imageWidth, imageHeight} = props;

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
      <Rating
        className="place-card__rating"
        starsClassName="place-card__stars"
        value={offer.rating}
      />
      <h2 className="place-card__name">
        <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
      </h2>
      <p className="place-card__type"><PropertyType type={offer.type}/></p>
    </div>
  </article>;
};

OfferCard.propTypes = {
  offer: ComplexPropType.OFFER.isRequired,
  onHover: PropTypes.func.isRequired,
  cardClassName: PropTypes.string,
  imageWrapperClassName: PropTypes.string,
  cardInfoClassName: PropTypes.string,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
};


export {OfferCard};
