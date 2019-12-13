import React, {PureComponent} from 'react';
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classNames from "classnames";

import Header from "../header/header";
import {
  receiveNearbyOffersSelector,
  receiveOfferSelector
} from "../../reducer/data/selectors";
import Bookmark from "../bookmark/bookmark";
import {ReviewsList} from "../reviews-list/reviews-list";
import {CityMap} from "../city-map/city-map";
import {OffersList} from "../offers-list/offers-list";


class Offer extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {offerData, nearbyOffers} = this.props;

    return <div className="page">
      <Header/>
      {offerData &&
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {offerData.images.slice(0, 6).map((img) =>
                  <div
                    key={img}
                    className="property__image-wrapper"
                  >
                    <img className="property__image" src={img} alt="Photo studio" />
                  </div>
                )}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {offerData.isPremium &&
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>}
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {offerData.title}
                  </h1>
                  <Bookmark
                    offer={offerData}
                    className="property__bookmark-button"
                    iconClassName="property__bookmark-icon"
                    isLarge
                  />
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${Math.round(offerData.rating) * 20}%`}} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{offerData.rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {offerData.type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {offerData.bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {offerData.maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">€{offerData.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {offerData.goods.map((item) =>
                      <li key={item} className="property__inside-item">
                        {item}
                      </li>
                    )}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div
                      className={classNames(
                          `user__avatar-wrapper`,
                          `property__avatar-wrapper`,
                          {
                            "property__avatar-wrapper--pro": offerData.host.isPro
                          }
                      )}
                    >
                      <img className="property__avatar user__avatar" src={`/${offerData.host.avatar}`} width={74} height={74} alt="Host avatar" />
                    </div>
                    <span className="property__user-name">
                      {offerData.host.name}
                    </span>
                    {offerData.host.isPro &&
                    <span className="property__user-status">
                      Pro
                    </span>}
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {offerData.description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews · <span className="reviews__amount">1</span></h2>
                  <ReviewsList/>
                  <form className="reviews__form form" action="#" method="post">
                    <label className="reviews__label form__label" htmlFor="review">Your review</label>
                    <div className="reviews__rating-form form__rating">
                      <input className="form__rating-input visually-hidden" name="rating" defaultValue={5} id="5-stars" type="radio" />
                      <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                        <svg className="form__star-image" width={37} height={33}>
                          <use xlinkHref="#icon-star" />
                        </svg>
                      </label>
                      <input className="form__rating-input visually-hidden" name="rating" defaultValue={4} id="4-stars" type="radio" />
                      <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
                        <svg className="form__star-image" width={37} height={33}>
                          <use xlinkHref="#icon-star" />
                        </svg>
                      </label>
                      <input className="form__rating-input visually-hidden" name="rating" defaultValue={3} id="3-stars" type="radio" />
                      <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
                        <svg className="form__star-image" width={37} height={33}>
                          <use xlinkHref="#icon-star" />
                        </svg>
                      </label>
                      <input className="form__rating-input visually-hidden" name="rating" defaultValue={2} id="2-stars" type="radio" />
                      <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
                        <svg className="form__star-image" width={37} height={33}>
                          <use xlinkHref="#icon-star" />
                        </svg>
                      </label>
                      <input className="form__rating-input visually-hidden" name="rating" defaultValue={1} id="1-star" type="radio" />
                      <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
                        <svg className="form__star-image" width={37} height={33}>
                          <use xlinkHref="#icon-star" />
                        </svg>
                      </label>
                    </div>
                    <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" defaultValue={``} />
                    <div className="reviews__button-wrapper">
                      <p className="reviews__help">
                        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                      </p>
                      <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
                    </div>
                  </form>
                </section>
              </div>
            </div>
            <CityMap
              className="property__map"
              items={[offerData, ...nearbyOffers]}
              initialLocation={offerData.location}
              activeItem={offerData}
            />
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <OffersList
                className="near-places__list"
                places={nearbyOffers}
                cardClassName="near-places__card"
                imageWrapperClassName="near-places__image-wrapper"
                imageWidth={260}
                imageHeight={200}
              />
            </section>
          </div>
        </main>
      }
    </div>;
  }
}

Offer.propTypes = {
  offerData: PropTypes.object,
  nearbyOffers: PropTypes.array
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offerData: receiveOfferSelector(state, ownProps.match.params.id),
  nearbyOffers: receiveNearbyOffersSelector(state, ownProps.offerData).slice(0, 3)
});


export {Offer};
export default connect(mapStateToProps)(withRouter(Offer));

